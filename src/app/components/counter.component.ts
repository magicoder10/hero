import {Component} from '@hero';

@Component({
    selector: 'ui-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
    seconds: number;

    constructor() {
        this.seconds = 0;

        setInterval(()=>{
            this.seconds++;
        }, 1000);
    }
}
