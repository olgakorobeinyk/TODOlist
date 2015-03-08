
describe('TODO MVC homepage', function() {

    var
        header = element(by.xpath("//header[@id='header']/h1")),
        newTodo = element(by.xpath("//input[@id='new-todo']")),
        tasksList = element(by.xpath(".//ul[@id='todo-list']")).all(by.css('li')),
        checkboxes = element.all(by.model('todo.completed')),
        removeBtns = element(by.xpath("//button[@class='destroy']")),
        filtersBlock = element(by.css('ul#filters')),
        activeFilter = element(by.xpath("//a[text()='Active']")),
        completedFilter = element(by.xpath("//a[text()='Completed']")),
        allFilter = element(by.xpath("//a[text()='All']")),
        clearCompleted = element(by.css('button#clear-completed.ng-binding::after')),
        counterLeft = element(by.css('strong.ng-binding'));

    var
        firstTask = "First thing needs to be done",
        editedTask = "First thing is done",
        secondTask = "Second thing needs to be done";


    addTask = function (todoItem) {

        return newTodo.sendKeys(todoItem)
            .then(function () {
                return newTodo.sendKeys(protractor.Key.ENTER);
            });
    }

    it('should have a title', function() {
        browser.get('http://todomvc.com/examples/angularjs/#/');

        expect(browser.getTitle()).toEqual('AngularJS • TodoMVC');
    });

    it('should have header', function() {

        expect(header.getText()).toEqual('todos');
    });

    it('should display text in placeholder', function() {

        expect(newTodo.getAttribute('placeholder')).toEqual('What needs to be done?');
    });

    it('should add new TODO item', function() {
        addTask(firstTask);

        expect(tasksList.get(0).getText()).toEqual(firstTask);
    });

    it('should edit TODO item', function() {
        browser.actions().doubleClick(tasksList.get(0))
            .sendKeys(firstTask, protractor.Key.CONTROL, "a", protractor.Key.NULL, editedTask)
            .sendKeys(protractor.Key.ENTER).perform();

        //make the driver sleep for seeing the editing of the item
        browser.driver.sleep(2000);

        expect(tasksList.get(0).getText()).toEqual(editedTask);
    });

    it('should mark item as completed', function() {
        checkboxes.get(0).click();

        //make the driver sleep for seeing the task was marked as completed
        browser.driver.sleep(2000);

        expect(tasksList.get(0).getAttribute("class")).toEqual("ng-scope completed");
    });

    it('should add more then one TODO item', function() {
        addTask(secondTask);

        //make the driver sleep for seeing the second task was added
        browser.driver.sleep(2000);

        expect(tasksList.count()).toEqual(2);
    });

    it('should filter active items', function() {
        activeFilter.click();

        //make the driver sleep for seeing the active items
        browser.driver.sleep(2000);

        expect(tasksList.count()).toEqual(1);
    });

    it('should filter completed items', function() {
        completedFilter.click();

        //make the driver sleep for seeing the completed items
        browser.driver.sleep(2000);

        expect(tasksList.count()).toEqual(1);
    });

    it('should filter all items', function() {
        allFilter.click();

        //make the driver sleep for seeing the all items in the list
        browser.driver.sleep(2000);

        expect(tasksList.count()).toEqual(2);
    });

    it('should remove the mark "completed"', function() {
        checkboxes.get(0).click();

        //make the driver sleep for seeing the removing of the marking "completed"
        browser.driver.sleep(2000);

        expect(tasksList.get(0).getAttribute("class")).not.toEqual("ng-scope completed");
    });

    it('should count uncompleted items', function() {
        expect(counterLeft.getText()).toBe('2');

        //mark first item as completed
        checkboxes.get(0).click();

        //make the driver sleep for seeing the item was marked as completed
        browser.driver.sleep(2000);

        expect(counterLeft.getText()).toBe('1');
    });

    it('should clear completed items', function() {
        expect(tasksList.count()).toEqual(2);

        filtersBlock.getSize().then(function(size){
            var xOffset = size.width - 50;
            var yOffset = 10;

            return browser.actions().mouseMove(filtersBlock, {x:xOffset, y:yOffset}).click().perform();
        }).then(function(){

            //make the driver sleep for seeing the removing of the completed items
            browser.driver.sleep(2000);

            expect(tasksList.count()).toEqual(1);
        })
    });

    it('should remove TODO item', function() {
        browser.actions().mouseMove(tasksList.get(0), {x:535, y:15}).click().perform()
            .then(function(){

            //make the driver sleep for seeing the removing of the active item
            browser.driver.sleep(2000);

            expect(tasksList.count()).toEqual(0);
        });
    });

});