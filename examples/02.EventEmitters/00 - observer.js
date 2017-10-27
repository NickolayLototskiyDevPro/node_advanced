class Test {
    constructor(){
        this.count = 1;
        this.name = '';
        this.status = false;
        this.longevity = null;
    }

    increaseCounter(){
        this.count++;
    }

    setTestParams(name, longevity, status){
        this.name = name;
        this.longevity = longevity;
        this.status = status;
    }

    setTestParamsAsync(){
        let interval = setInterval(() => {
            this.increaseCounter();
            if(this.count > 4){
                clearInterval(interval);
            }
            this.setTestParams(`Test ${this.count}`, this.count * 10, true);
        }, 200)
    }
}

let notify = function(){
    const testStatus = this.status ? 'Passed': 'Failed';
    console.log(`Test ${this.name} was ${testStatus} - longevity:${this.longevity}`);
}

let logger = function(){
    console.log(`Test with name ${this.name} - running`);
}

class ObservableTest extends Test {
    constructor(){
        super();
        this.observableList = [];
    }

    appendListener(functionName, listener){
        if(typeof listener === 'function'){
            this.observableList.push({functionName, listener});
            return true;
        }

        return false;
    }

    removeEventListener(listener){
        for(let i = 0; i < this.observableList.length; i++){
            if(listener === this.observableList[i]){
                this.observableList.splice(i, 1);
            }
        }
    }

    notify(functionName){
        for(let i = 0; i < this.observableList.length; i++){
            if (this.observableList[i].functionName === functionName){
                this.observableList[i].listener.call(this);
            }
        }
    }

    setTestParams(name, longevity, status){
        super.setTestParams(name, longevity, status);
        if(this.observableList.length > 0){
            this.notify('setTestParams');
        }
    }

    setTestParamsAsync(){
        super.setTestParamsAsync();
        if(this.observableList.length > 0){
            this.notify('setTestParamsAsync');
        }
    }
}

const test1 = new ObservableTest();
test1.appendListener('setTestParams', notify);
test1.appendListener('setTestParams', logger);

test1.setTestParamsAsync();

