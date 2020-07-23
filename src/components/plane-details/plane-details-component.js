import { view } from '../../core/view';
import template from './plane-details-template.html';

const events = [
    { event: 'click', selector: '.btn.btn-save', func: 'onSaveClick' },
    { event: 'click', selector: '.btn.btn-delete', func: 'onDeleteClick' }
];

/**
 * 
 * @param {object} options -set of properties
 */
export const PlaneDetails = (options) => {
    // to view we pass a set of properties
    // but we exted it a little bit.
    return view({
        template,
        events,
        ...options,
        onSaveClick() {
            const title = this.$el.find('#details-title').val();
            const about = this.$el.find('#details-about').val();
            this.model = {...this.model, ... { title, about } };

            if (this.model.id) {
                this.updateModel((model) => this.onModelChange(model));
            } else {
                this.saveModel((model) => this.onModelChange(model));
            }
            this.$el.modal('toggle');
        },

        onDeleteClick() {
            this.deleteModel(() => this.onModelDelete());
            this.$el.modal('toggle');
        }
    });
};