import { emptyModel } from "../utils/const";

/**
 * Функция создание объекта компонента
 * @param {object} options -set of properties
 * @return {object} - instance of component;* 
 */
export const view = (options) => {
    return {
        subComponents: [],
        template: `<div></div>`,
        model: emptyModel,
        /**
         * Функция отображения компонента на странице.
         * @param {jquery object} $toElement - jquery элемент в который вставляем текущий компонент.
         */

        // отображение елементов на странице
        render($toElement) {
            this.$parent = $toElement;
            if (this.$el) {
                this.$el.appendTo($toElement); // показывает елемент на странице.
            } else {
                this.createTemplate();
                this.$el = $(this.template(this.model));
                this.$el.appendTo($toElement); // показывает елемент на странице.
                if (_.isFunction(this.showComponents)) {
                    this.showComponents();
                }
            }

            this.bindEvents();

            return this;
        },

        //создание временной переменной
        createTemplate() {
            if (!_.isFunction(this.template)) {
                this.template = _.template(this.template);
            }
        },

        bindEvents() {
            if (Array.isArray(this.events)) {
                this.events.forEach(e => {
                    const { event, selector, func } = e;
                    this.$el.find(selector).on(event, (jqueryEvent) => {
                        return this[func](jqueryEvent);
                    });
                });
            }

        },

        // запрос данных с хранилища
        getModel(cb) {
            const self = this;

            $.ajax({
                url: `http://localhost:3000/${this.getUrl()}`,
                method: 'GET'
            }).then(cb.bind(self), error => {
                console.log('Error on GET request!');
                console.error(error);
            });
        },

        ...options
    }
};