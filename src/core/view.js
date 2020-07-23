import { emptyModel } from "../utils/const";

/**
 * Функция создание объекта компонента
 * @param {object} options -set of properties
 * @return {object} - instance of component;* 
 */
export const view = (options) => {
    // const { template, components, events, model } = options;

    return {
        subComponents: [],
        template: `<div></div>`,
        model: emptyModel,
        /**
         * Функция отображения компонента на странице.
         * @param {jquery object} $toElement - jquery элемент в который вставляем текущий компонент.
         */
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

        updateUi(model) {
            this.model = model ? model : this.model;
            if (this.model) {
                this.reRender();
            } else {
                this.$el.remove();
            }
        },

        reRender() {
            const $newEl = $(this.template(this.model));
            this.$el.replaceWith($newEl);
            this.$el = $newEl;

            this.bindEvents();
        },

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

        getUrl() {
            return `article/${this.model.id}`;
        },

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

        saveModel(cb) {
            const self = this;

            $.ajax({
                url: `http://localhost:3000/article`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(this.model)
            }).then(cb.bind(self));
        },

        updateModel(cb) {
            const self = this;

            $.ajax({
                url: `http://localhost:3000/article/${this.model.id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(this.model)
            }).then(cb.bind(self));
        },

        deleteModel(cb) {
            const self = this;

            $.ajax({
                url: `http://localhost:3000/article/${this.model.id}`,
                method: 'DELETE',
            }).then(cb.bind(self));
        },

        syncModel(model) {
            this.updateUi(model);
        },

        ...options
    }
};