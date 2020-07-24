import './planes-style.scss' 
import { view } from '../../core/view';
import { Plane } from '../plane/plane-component';
import { PlaneDetails } from '../plane-details/plane-details-component';
import template from './planes-template.html';

const events = [
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
        // адрес запроса в место хранения данных
        getUrl() {
            return `article/?type=major`
        },

        // отображение карточек с новостьями
        showComponents() {
            this.getModel(this.showEachPlane);
        },

        // проверка на наличие массива данных, в случаи наличия массива данных прорисовуются заметки с новостями
        showEachPlane(planes) {
            if (!_.isArray(this.model.planes) && _.isArray(planes)) {
                this.model.planes = planes;
            }
            planes.forEach(plane => {
                const c = Plane({ model: plane });
                this.subComponents.push(c.render(this.$el.find('#planes-container.row')));
            });
        },

        // функция поиска новостей по ключевым словам и фразам(поиск по тексту)
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