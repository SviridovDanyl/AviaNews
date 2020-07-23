import { view } from '../../core/view';
import template from './plane-template.html';
import './plane-style.scss';
import { PlaneDetails } from '../plane-details/plane-details-component';

const events = [
    // { event: 'click', selector: '.btn.like', func: 'onLikeClick' },
    { event: 'click', selector: '.plane-img', func: 'onShowDetails' }
];

/**
 * 
 * @param {object} options -set of properties
 */
export const Plane = (options) => {
    // to view we pass a set of properties
    // but we exted it a little bit.
    return view({
        template,
        events,
        ...options,
        onLikeClick() {
            this.model.like++; // изменение объекта модели

            this.updateModel(this.updateUi); // синхронизация модели с сервером.
        },
        onShowDetails() {
            const details = PlaneDetails({ model: this.model });
            details.render(this.$parent);
            details.$el.modal('toggle');
            details.onModelChange = (model) => {
                this.updateUi(model);
            }

            details.onModelDelete = () => {
                this.$el.remove();
            }
        }
    });
};