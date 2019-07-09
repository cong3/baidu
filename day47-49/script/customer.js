class Customer {
    constructor(avatarUrl) {
        this.id  = getRandomID();
        this.ordered = [];
        this.taskStack = [];            // 任务列表
        this.avatarUrl = avatarUrl;
        this.state = 'waiting';
    }
    // 添加任务
    addTask(type, ...args) {
        this.taskStack.push([type, args]);
        // 添加完毕调用执行
        this.do();
    }
    // 更改当前状态
    working(){
        this.state = 'working';
    }
    // 更改当前状态
    waiting(){
        this.state = 'waiting';
    }
    // 随机说话
    randomSpeak() {
        let queue = this.restaurant.queue;
        let randomIdx = getRandom(0, queue.getLength());
        let customer = queue.getQueue()[randomIdx];
        if(customer){
            customer.say('chat');
        }

    }
    // 渲染
    say(type, ...args){
        let $restaurantView = this.$restaurantView;
        let string;

        if(type === 'order'){
            let word = words.customer.order;
            let randomIdx = getRandom(0, word.length - 1);
            if(word[randomIdx]){
                string = word[randomIdx] + args[0];
            }
        }else if(type === 'chat'){
            let word = words.customer.chat;
            let randomIdx = getRandom(0, word.length - 1);

            string = word[randomIdx];
        }

        if(string){
            $restaurantView.addWord(this.element, string);
        }
    }
    // 进入队列
    queueUp(restaurant) {
        let customer = this;
        this.restaurant = restaurant;
        let $restaurantView = this.$restaurantView = restaurant.$view;

        return new  Promise((resolve, reject) => {
            restaurant.queue.queueUp(customer);
            $restaurantView.moveToQueue(customer, restaurant.queue)
                .then(()=>{
                    customer.randomSpeak();
                    resolve();
                })
        })
    }
    // 入座
    toSeat(idx) {
        let customer = this;
        let $restaurantView = this.$restaurantView;
        let restaurant = this.restaurant;

        return new Promise((resolve, reject) => {
            if (restaurant.queue.getLength() > 0) {
                $restaurantView.updateQueue(restaurant.queue);
            }

            $restaurantView.moveToSeat(customer.element, idx)
                .then(() => {
                    resolve(customer);
                })

        })
    }
    do() {
        let customer = this;
        if (customer.state === 'waiting' && customer.taskStack.length >0) {
            customer.working();
            let [type, args] = customer.taskStack.shift();
            if (type == 'queue') {
                customer.queueUp(...args)
                    .then(()=> {
                        customer.waiting();
                        customer.restaurant.emit('queueup');
                        customer.do();
                    });
            }else if(type === 'toseat'){
                return customer.toSeat(...args)
                    .then((customer)=>{
                        customer.waiting();
                        customer.restaurant.emit('sitin', customer);
                        customer.do();
                    });
            }
        }
    }


































    
}