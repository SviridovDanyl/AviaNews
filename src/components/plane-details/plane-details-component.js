import { view } from '../../core/view';
import template from './plane-details-template.html';

/**
 * 
 * @param {object} options -set of properties
 */
export const PlaneDetails = (options) => {
    return view({
        template,
        ...options
    });
};