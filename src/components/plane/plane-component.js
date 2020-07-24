import { view } from '../../core/view';
import template from './plane-template.html';
import './plane-style.scss';
import { PlaneDetails } from '../plane-details/plane-details-component';

const events = [
    { event: 'click', selector: '.plane-img', func: 'onShowDetails' }
];

/**
 * 
 * @param {object} options -set of properties
 */
export const Plane = (options) => {
    return view({
        template,
        events,
        ...options,
/* Вызов функции отображение модального окна с новостями*/
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