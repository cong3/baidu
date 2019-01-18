// 餐厅类
function Restaurant(obj)
{
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
   
    this.hire = function(staff)
    {
        this.staff.push(staff);
    };
    this.fire = function(staff)
    {
        this.staff.pop();
    }
}
// 职员类
function Staff(id, name, wages)
{
    this.id = id;
    this.name =  name;
    this.wages = wages;
}
Staff.prototype.work = function() {
    console.log("完成工作");
}
// 服务员类
function Waiter(arr)
{
    this.arr = arr;
}
Waiter.prototype.work = function() {
    if(typeof this.arr == 'Array') {
        console.log("记录客人点菜");
    }else {
        console.log("上菜");
    }
}
// 厨师类
function Cook(id, name, wages) {
    Staff.call(this,id, name, wages);
}
// 顾客类
function Customer()
{

}
Customer.prototype.Order = function()
{
    console.log("顾客点菜");
}
Customer.prototype.eat = function()
{
    console.log("顾客吃");
}
// 菜品类
function Food(name, cost, price)
{
    this.name = name;
    this.cost = cost;
    this.price= price;
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook(1,"Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);