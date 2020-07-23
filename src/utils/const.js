export const $headerContainer = $('#header-container');
export const $mainContainer = $('#main-container');
export const error = {
    template: `<h1 class="text-danger">Some thing went wrong. Try to refresh the page. And relogin!</h1>`,
    render() {
        $('body').html(this.template);
    }
};

export const emptyModel = {
    "id": "",
    "picture": "",
    "article": "",
    "title": "",
    "data":"",
    "author":"",
    "type":""
};