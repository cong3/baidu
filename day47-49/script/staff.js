class  Staff {
    constructor({name, salary, avatarUrl}) {
        this.name = name;
        this.salary = salary;
        this.avatarUrl = avatarUrl;     // 图片
        this.taskStack = [];            // 任务列表
        this.state = 'waiting';
    }

    // 绑定餐厅和视图
    entry(restaurant){
        this.restaurant = restaurant;
        this.$restaurantView = restaurant.$view;
    }

    waiting() {
        this.state = 'waiting';
    }

    working() {
        this.state = 'working';
    }
    

    do() {

    }
}

class Waiter extends Staff{
    constructor(info) {
        super(info);
        this.id = getRandomID();
    }
}

class Chef extends Staff{
    constructor(info) {
        super(info);
        this.id = getRandomID();
    }
}