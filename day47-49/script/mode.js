// 位置
const positions = {
    waiter:{
        toTable: [[340, 400]],
        toKitchen: [60.3, 10]
    },
    customer:{
        initial: [-80, 35],     // 顾客厨师位置
        enter: [20, 35],
        toSeat: [[200, 540]],
        toExit: [100, 88],
        toLine: [[20, 540], [20, 440], [20, 340], [20, 240], [20, 140], [20, 40]]
    },
    chef:{
        toKitchen: [740, 40]
    }
};

// 动画时间
const timeUnit = {
    customer: {
        enter: 0.5,
        toLine: [1.5, 1.25, 1, 0.75, 0.5, 0.25],
        toNext: 0.2,
        toSeat: [0.5],
        toExit: 1,
        order: 3,
        eat: 3
    },
    waiter: {
        toKitchen: 1.5,
        toTable: [1.5]
    },
    msgTime: 2
};

// 口号哈哈哈哈
const words = {
    waiter: {
        greet: '欢迎光临!',
        checkout: '一共收您',
        served: '亲，这是您的'
    },
    chef: {
        remind: '做好了！'
    },
    customer: {
        chat: ['屏幕对面的你在干嘛？',
            '下班吃饭，单身狗日常。',
            '这家店的东西不错，但就是得排队！',
            '今天你那边下雨了吗？',
            '一一得一，一二得二，二二得三...',
            '排队真烦',
            '有钱没钱回家过年',
            '聪哥哥最帅啦！',
            '么么么么么哒',
        ],
        order: ['我要',
            '我要吃',
            '我点',
            '饿饿饿饿饿'
        ]
    }
}