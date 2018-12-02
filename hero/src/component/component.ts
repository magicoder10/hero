enum ViewEncapsulation {
    Native,
    None
}

interface ComponentMetadata {
    selector: string
    template?: string
    templateUrl?: string
    styles?: string[]
    styleUrls?: string[]
    encapsulation?: ViewEncapsulation
}

export function Component(metadata: ComponentMetadata): Function {
    return (Controller: any) => {
        if (!metadata.selector) {
            throw `must specify selector`
        }

        if (!isValidCustomElementName(metadata.selector)) {
            throw `${metadata.selector} is not a valid custom element name`
        }

        return elementFactory(Controller, metadata);
    };
}

interface RelatedNodes {
    [propertyName: string]: [any]
}

function elementFactory(Controller: any, metadata: ComponentMetadata): Function {
    const templateEl = document.createElement('template');

    const styles = `<style>${metadata.styles.join('')}</style>`;

    const template = `${metadata.template}`;

    templateEl.innerHTML = `${styles}${template}`;

    return function () {
        let controller = new Controller(...arguments);

        class newConstructor extends HTMLElement {

            constructor() {
                super();
            }

            connectedCallback() {
                this._attachTemplate();
            }

            _attachTemplate() {
                const clone = document.importNode(templateEl.content, true);
                let properties = {};
                let relatedNodes: RelatedNodes = {};
                bindData(clone, controller, properties, relatedNodes);

                Object.keys(properties)
                    .forEach(propertyName => renderProperty(relatedNodes, properties, propertyName));

                this.appendChild(clone);
            }
        }

        window.customElements.define(metadata.selector, newConstructor);
        return controller;
    }
}

function renderProperty(relatedNodes, properties, propertyName) {
    relatedNodes[propertyName].forEach(metadata =>
        metadata.node.textContent = metadata.text.replace(/{{(\w+)}}/g, (_, propName) => {
            return properties[propName];
        })
    );
}

function bindProperty(controller, propertyName, relatedNodes, properties) {
    properties[propertyName] = controller[propertyName];
    Object.defineProperty(controller, propertyName, {
        set(newValue) {
            properties[propertyName] = newValue;
            renderProperty(relatedNodes, properties, propertyName);
        },
        get() {
            return properties[propertyName];
        }
    });
}

function bindData(node: Node, controller, properties, relatedNodes: RelatedNodes) {
    if (node.nodeType == document.TEXT_NODE) {
        const text = node.textContent;
        text.replace(
            /{{(\w+)}}/g,
            (_, propertyName) => {
                if (!relatedNodes[propertyName]) {
                    relatedNodes[propertyName] = [{
                        node,
                        text: node.textContent
                    }];
                    bindProperty(controller, propertyName, relatedNodes, properties);
                } else {
                    relatedNodes[propertyName].push({
                        node,
                        text: node.textContent
                    });
                }
                return null;
            }
        );

    } else {
        Array.from(node.childNodes)
            .forEach(childNode => bindData(childNode, controller, properties, relatedNodes));
    }
}

function isValidCustomElementName(name: string): boolean {
    const PCENChar = '-|\.|[0-9]|_|[a-z]';
    const potentialNameRegExp = new RegExp(`^[a-z](${PCENChar})*-(${PCENChar})*$`);
    return potentialNameRegExp.test(name);
}

