class Restaurant{
    constructor({cash, seat, msgContentId}){
        let restaurant = this;
        this.cash = cash;
        this.$msgContent = document.querySelector(msgContentId);
        this.$msgWrapper = this.$msgContent.parentNode;
        this.menu = [];
        this.queue = [];
        this.handler = [];
        this.staff = (function(){
            let staff = [];

            return{
                hire: person =>{
                    let sameProfessionEmployee;

                    if(staff.length > 0){
                        sameProfessionEmployee = staff.find(employee => employee.constructor.name === person.constructor.name);
                    }

                    if(!sameProfessionEmployee){
                        staff.push(person);
                        restaurant.emit('hireemployee', person);
                    }
                },
                fire: person =>{
                    if(staff.length > 0){
                        staff.forEach((employee, idx) =>{
                            if(employee === person){
                                staff.splice(idx, 1);
                                restaurant.emit('hireemployee', person);
                            }
                        });
                    }
                },
                getStaff: ()=>{
                    return staff.concat();
                },
                getCook: ()=>{
                    return staff.find(employee => employee.constructor.name === 'Cook');
                },
                getWaiter: ()=>{
                    return staff.find(employee => employee.constructor.name === 'Waiter');
                }
            }
        }());

        this.seat = (function(restaurant, amount){
            let seat = [];

            return{
                sitIn: customer =>{
                    seat.push(customer);
                    restaurant.emit('customersitdown', customer);
                },
                leave: count =>{
                    seat.shift();
                    restaurant.emit('customerleave', restaurant);
                },
                getCustomer: ()=>{
                    return seat[0];
                }
            }
        }(this, seat));

        this.addListener();
        this.emit('becreated', restaurant);
    }
    addListener(){
        let restaurant = this;

        this.watch('becreated', ()=>{
            restaurant.sendMessage('restaurant', 'The restaurant has been created!');
        });

        this.watch('hireemployee', employee =>{
            restaurant.sendMessage('restaurant', `The restaurant hired the employee ${employee.name}!`);
        });

        this.watch('fireemployee', employee =>{
            restaurant.sendMessage('restaurant', `The restaurant fired the employee ${employee.name}!`);
        });

        this.watch('customersitdown', customer =>{
            restaurant.sendMessage('restaurant', 'Customer has sat down!');
            customer.order(restaurant);
        });

        this.watch('customerleave', restaurant =>{
            restaurant.sendMessage('restaurant', 'Customer has left!')
            restaurant.sendMessage('restaurant', 'The seat is empty!')
            restaurant.seat.sitIn(restaurant.queue.shift());
        });

        this.watch('orderedfoods', customer =>{
            let orderedFood = customer.ordered.concat();
            let waiter = restaurant.staff.getWaiter();

            restaurant.sendMessage('restaurant', 'Customer has ordered foods!');
            restaurant.sendMessage('restaurant', `Foods are ${orderedFood.reduce((string, food) => {
                string += ` ${food.name} `;
                return string;
            }, '')}`);

            waiter.work(restaurant, orderedFood);
        });

        this.watch('gotthemenu', foods =>{
            let cook = restaurant.staff.getCook();

            restaurant.sendMessage('restaurant', 'Waiter has got the menu!')

            cook.work(restaurant, foods);
        });

        this.watch('cookedfood', food =>{
            let waiter = restaurant.staff.getWaiter();

            restaurant.sendMessage('restaurant', `The food ${food.name} has been cooked!`);

            waiter.work(restaurant, food);
        });

        this.watch('servedfood', food =>{
            let customer = restaurant.seat.getCustomer();

            restaurant.sendMessage('restaurant', `Waiter has served the food ${food.name}!`);

            customer.eat(restaurant, food);
        });

        this.watch('eatedfood', food =>{
            restaurant.sendMessage('restaurant', `Customer has eated the food ${food.name}!`);
        })
    }

    addFoods(foods){
        this.menu.push(...foods);
        this.sendMessage('restaurant', 'The restaurant added food menu!');
    }
    queueUp(...people){
        this.queue.push(...people);
    }
    start(){
        this.sendMessage('restaurant', 'The restaurant is open!')
        this.seat.sitIn(this.queue.shift());
    }
    watch(type, fn){
        if(!this.handler[type]){
            this.handler[type] = [];
        }

        this.handler[type].push(fn);
    }
    emit(type, restaurant){
        if(this.handler[type]){
            this.handler[type].forEach(fn => fn(restaurant));
        }
    }
    sendMessage(writer, msg){
        let $li = createElm(`<li><b>${writer}: </b>${msg}</li>`);

        this.$msgContent.appendChild($li);

        let scrollHeight = this.$msgWrapper.scrollHeight;

        this.$msgWrapper.scrollTo(0, scrollHeight)

        function createElm(string){
            let div = document.createElement('div');
            div.innerHTML = string;
            return div.children[0];
        }
    }
}