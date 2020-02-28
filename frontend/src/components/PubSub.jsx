// from this but i do understand this concept... https://medium.com/coding-stuff/pubsub-for-communicating-between-react-components-999159d59a77
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
export * from './topics.js';

const mainSubject = new Subject();

export const publish = (topic, data) => {
    mainSubject.next({ topic, data })
};

export class Subscriber {
    unsub = null
    
    constructor(topic, callback) {
        this.unsub = mainSubject
            .pipe(filter(f => f.topic === topic))
            .subscribe(s => callback(s) );
    }
    
    // be sure to call this before losing reference
    destroy() {
        this.unsub.unsubscribe();
    }
}

