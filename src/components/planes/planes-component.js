import './planes-style.scss' 
import { view } from '../../core/view';
import { Plane } from '../plane/plane-component';
import { PlaneDetails } from '../plane-details/plane-details-component';
import template from './planes-template.html';

const events = [
    { event: 'click', selector: '.btn.btn-add', func: 'onAddClick' },
    { event: 'click', selector: '.btn.btn-search', func: 'onSearchClick' },
    { event: 'input', selector: '#search', func: 'onSearchClick' },
];

export const Planes = (options) => {
    const component = view({
        model: {
            type: ''
        },
        template,
        events,
        ...options,
        getUrl() {
            return `article/?type=${this.model.id}`
        },
        showComponents() {
            this.getModel(this.showEachPlane);
        },

        showEachPlane(planes) {
            if (!_.isArray(this.model.planes) && _.isArray(planes)) {
                this.model.planes = planes;
            }
            planes.forEach(plane => {
                const c = Plane({ model: plane });
                this.subComponents.push(c.render(this.$el.find('#planes-container.row')));
            });
        },

        onAddClick() {
            const self = this;
            const details = PlaneDetails();
            details.render(this.$parent);
            details.onModelChange = (plane) => {
                const c = Plane({ model: plane });
                this.subComponents.push(c.render(self.$el.find('#planes-container.row')));
            };
            details.$el.modal('toggle');
        },
        onSearchClick() {
            const searchVal = this.$el.find('#search').val();
            this.subComponents.forEach(plane => {
                if (plane.model.title.toLowerCase().includes(searchVal.toLowerCase())) {
                    plane.$el.show()
                } else {
                    plane.$el.hide();
                }
            });
        }
    });

    return component;
};