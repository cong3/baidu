class View {

    constructor(id, timeScale){
        this.timeScale = timeScale;
        this.$container  = document.querySelector(id);
        this.$cashNum    = this.$container.querySelector('.cash .count');               // 金额
        this.$cookState  = this.$container.querySelector('.chef .chef-state');         // 厨师状态
        this.$cookList   = this.$container.querySelector('.chef .list .wrapper ul');  // 待做
        this.$orderedList= this.$container.querySelector('.table .list');            // 点的菜
        this.$customerCt = this.$container.querySelector('.man .customers');        // 顾客
        this.$employeeCt = this.$container.querySelector('.man .employees');       // 职员
        let ctWidth  = getComputedStyle(this.$container).width;
        let ctHeight = getComputedStyle(this.$container).height;
        this.initialCookState();
    }
    // 初始化厨师状态
    initialCookState() {
        this.$cookState.innerHTML = `<span class="thing">空闲中</span><span class="time"></span>`;
    }
    // 设置金额
    setCash(cash) {
        this.$cashNum.innerText = cash;
    }
    // 添加服务员
    addWaiter(waiter) {
        let [initialLeft, initialTop] = positions.waiter.toTable[0];
        let innerHTML = `<div class="waiter" style="background-image: url(${waiter.avatarUrl}); left: ${initialLeft}px; top: ${initialTop}px;"></div>`;
        let $waiter = createElement(innerHTML);
        waiter.element = $waiter;
        this.$employeeCt.appendChild($waiter);

    }
    // 添加厨师
    addChef(cook) {
        let [initialLeft, initialTop] = positions.chef.toKitchen;
        let innerHTML = `<div class="chef" style="background-image: url(${chef.avatarUrl}); left: ${initialLeft}px; top: ${initialTop}px;"></div>`;
        let $chef = createElement(innerHTML);

        chef.element = $chef;
        this.$employeeCt.appendChild($chef);
    }
    // 添加顾客
    addCustomer(customer) {
        let view = this;
        let [initialLeft, initialTop] = positions.customer.initial;
        let $customer = createElement(`<div class="customer" style="background-image: url(${customer.avatarUrl}); left: ${initialLeft}px; top: ${initialTop}px;"></div>`);

        customer.element = $customer;
        this.$customerCt.appendChild($customer);
    }
    // 顾客移动
    moveToQueue(customer, queue) {
        let $view = this;
        return new Promise((resolve, reject) => {
            let enterTime = timeUnit.customer.enter;
            let timeScale = $view.timeScale;            // 时间尺度
            let time = enterTime * timeScale;           // 移动时间
            let position =positions.customer.enter;     // 第一步的目标位置
            animation(customer.element, position, time, resolve)
        }).then(() => {
            let idx = queue.getQueue().indexOf(customer);
            if (idx === -1) {
                let enterTime = timeUnit.customer.enter;
                let timeScale = $view.timeScale;
                let time = enterTime * timeScale;
                let position = positions.customer.initial;
                animation(customer.element, position, time, callback);
            }else {
                let enterTime = timeUnit.customer.toLine[idx];
                let timeScale = $view.timeScale;            // 时间尺度
                let time = enterTime * timeScale;           // 移动时间
                let position =positions.customer.toLine[idx];     //目标位置
                return new Promise((resolve, reject) => {
                    animation(customer.element, position, time, resolve)
                })
            }

        });
        function callback(resolve){
            let children = $view.$customerCt.children;
            let idx = Array.from(children).indexOf(customer.element);
            if(idx !== -1){
                $view.$customerCt.removeChild(customer.element);
            }
        }
    }
    // 顾客讲话
    addWord($elm, string) {
        let msgTime = timeUnit.msgTime;
        let time = msgTime * this.timeScale;
        string = string.trim();
        showMessage($elm, string, time);
        function showMessage() {
            let start = new Date();
            $elm.style.zIndex =1;
            return requestAnimationFrame(function update() {
                let now  = new Date();
                let offset = now - start;
                $elm.innerHTML = `<div class="msg">${string}</div>`;
                if (offset < time) {
                    requestAnimationFrame(update);
                }else {
                    $elm.innerHTML = '';
                    $elm.style.zIndex = 0;
                }
            })
        }
    }
    // 更新队列
    updateQueue(queue){
        let timeScale = this.timeScale;

        roll(0);

        function roll(idx){
            let queueArray = queue.getQueue();
            let customer = queueArray[idx];

            new Promise((resolve, reject) =>{
                let toNextTime = timeUnit.customer.toNext;
                let time = toNextTime * timeScale;
                let position = positions.customer.toLine[idx];

                animation(customer.element, position, time, callback);

                function callback(){
                    if(queueArray[idx + 1]){
                        roll(idx + 1);
                    }
                    resolve();
                }
            });
        }
    }
    // 顾客入座
    moveToSeat($elm, idx){//1
        let timeScale = this.timeScale;
        let toSeatTime = timeUnit.customer.toSeat[idx];
        let time = timeScale * toSeatTime;
        let position = positions.customer.toSeat[idx];

        return new Promise((resolve, reject)=>{
            animation($elm, position, time, resolve);
        });
    }
}

function animation($elm, position, time, callback){

    let start = new Date();
    let startLeft = parseFloat(getComputedStyle($elm).left);    // 距离左边的距离
    let startTop = parseFloat(getComputedStyle($elm).top);      // 距离顶部的距离
    let distenceLeft = position[0] - startLeft;                 // 距离目标点距离
    let distenceTop = position[1] - startTop;

    return requestAnimationFrame(function step(){
        let now = new Date();
        let offset = (now - start) / time;  // 偏移量 如果现在时间减去开始时间再除以固定时间大于1了说明已经到了
        let left = startLeft + distenceLeft * offset;
        let top = startTop + distenceTop * offset;
        $elm.style.left = left + 'px';
        $elm.style.top = top + 'px';

        if(offset < 1){
            requestAnimationFrame(step);
        }else{
            if(callback){
                callback();
            }
        }
    });
}