const [INITIAL, START, CLOSE] = [0, 1, 2]; // 餐厅当前状态
let $view;
class Restaurant {
    constructor({cash, seatAmount, timeScale, elementId}) {
        this.state = INITIAL;
        this.handler = [];          // 所有的命令

        this.$view = $view = new View(elementId, timeScale);    // 视图层

        this.cash  = initialCash(cash);         // 金额操作

        this.queue = initialQueue(6);           // 队列

        this.menu = initialMenu();              // 菜单

        this.staff = initialSimpleStructure(this);      // 人事

        this.seats = initialSeat(seatAmount);           // 座位

        this.addListener();

    }
    addListener() {
        let restaurant = this;

        this.watch('hasemptyseat', (idx) => {
            if (restaurant.queue.getLength() > 0) {
                let customer = restaurant.queue.dequeue();
                let idx = restaurant.seats.getEmptySeatIndex();
                restaurant.seats.sit(idx, customer);
                customer.addTask('toseat', idx);
            }
        });

        // 出队入座
        this.watch('queueup', ()=>{
            let idx = restaurant.seats.getEmptySeatIndex();
            if(idx !== -1){
                this.emit('hasemptyseat', idx);
            }
        });

    }

    watch(type, fn) {
        if (!this.handler[type]) {
            this.handler[type] = [];
        }
        this.handler[type].push(fn);
    }
    emit(type, restaurant) {
        if(this.handler[type]){
            this.handler[type].forEach(fn => fn(restaurant));
        }
    }
    start() {
        let chef = this.staff.getChef();
        let waiter= this.staff.getWaiter();
        let foods = this.menu.getMenu();
        if(!chef){
            return new Error("The restaurant did not hire the chef!");
        }else if(!waiter){
            return new Error("The restaurant did not hire the waiter!");
        }else if(foods.length === 0){
            return new Error("The restaurant did not have food menu!")
        }else if(this.state === START){
            return;
        }else{
            this.state = START;
            if(this.seats.getEmptySeatIndex() !== -1){
                this.emit('hasemptyseat');
            }
        }
    }
    // 添加顾客
    addCustomer(customer) {
        let restaurant = this;
        $view.addCustomer(customer);
        customer.addTask('queue', restaurant);
    }
}

// 金额控制
function initialCash(cash) {
    $view.setCash(cash);
    return {
        getBalance: () => {
            return cash;
        },
        decCash: () => {
            if (typeof  cash=="number") {
                cash -= cash;
                $view.setCash(cash);
                return cash;
            }
        },
        incCash: () => {
            if (typeof  cash=="number") {
                cash+=cash;
                $view.setCash(cash);
                return cash;
            }

        }
    }
}

// 初始化队列
function initialQueue(count) {
    let queue = Array.from({length: count}).map(item => item = null);
    return {
        // 入列
        queueUp: function (person) {
            let idx = queue.indexOf(null);
            if (idx !== -1) {
                queue[idx] = person;
                return idx;
            }
            return idx;
        },
        // 出列
        dequeue: ()=> {
            let customer = queue.shift();
            queue[queue.length] = null;
            return customer;
        },
        // 获取长度
        getLength: () => {
            return queue.filter(customer=>customer!==null).length;
        },
        // 获取所有
        getQueue: ()=> {
            return queue;
        }
    }
}

// 菜单管理
function initialMenu() {
    let menu = [];
    return {
        addFood: (arg) => {
            if (arg.constructor == "Food") {
                menu.push(arg);
            }
        },
        getMenu: ()=>{
            return menu.concat();
        }
    }
}

// 人事管理
function initialSimpleStructure() {
    let staff = [];
    return {
        hire: person=>{
            let sameProfessionEmployee;
            if (staff.length >0) {
                sameProfessionEmployee = staff.find(employee => employee.constructor == person.constructor);
            }
            if (!sameProfessionEmployee) {
                staff.push(person);
                if (person.constructor == Waiter) {
                    $view.addWaiter(person);
                } else if (person.constructor == Chef) {
                    $view.addChef(person);
                }
            }
        },
        fire: person => {
            staff.forEach((employee, index)=> {
                if (employee === person) {
                    staff.splice(index, 1);
                }
            })

        },
        getStaff: () => staff.concat(),
        getWaiter: () => {
            return staff.find(employee => employee.constructor == Waiter);
        },
        getChef: () => {
            return staff.find(employee => employee.constructor == Chef);
        }
    }
}

// 座位管理
function initialSeat(seatAmount) {
    let seats = Array.from({length:seatAmount}).map(item => item =null);
    return{
        sit: (idx, customer) =>{
            seats[idx] = customer;
        },
        leave: idx =>{
            seats[idx] = null;
        },
        getEmptySeatIndex(){
            return seats.indexOf(null);
        },
        getTableIndex: (customer)=>{
            return seats.indexOf(customer);
        }
    }
}


class Food{
    constructor({name, cost, sale, time}){

        this.name = name;
        this.cost = cost;
        this.sale = sale;
        this.cookTime = getRandom(1, 10);
        this.state = 'serving';
    }
    serving(){
        this.state = 'serving';
    }
    served(){
        this.state = 'served';
    }
    eated(){
        this.state = 'eated';
    }
}
