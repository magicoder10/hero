import {Component} from '@hero';

@Component({
    selector: 'ui-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
    name: string;
    age: number;

    constructor() {
        this.name = 'Harry';
        this.age = 0;

        setInterval(()=>{
            this.age++;
        }, 1000);
    }
}
