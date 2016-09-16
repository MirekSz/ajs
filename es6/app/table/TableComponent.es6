"use strict";
import template from './template.hbs';
import styles from './TableCoponent.less';
/**
 * Created by Mirek on 2016-02-16.
 */
class TableComponent {

    renderTo(target) {
        this.target = target;
        target.html(template({columns: this.model.columns, rows: this.model.rows, styles}));
    }

    constructor(name) {
        this.name = name;
    }

    bindWithModel(model) {
        this.model = model;
        this.model.addModelChangeListener(()=> {
            this.reRender();
        })
    }

    reRender() {
        this.target.empty();
        this.renderTo(this.target);
    }

    renderTo(target) {
        this.target = target;
        target.html(template({columns: this.model.columns, rows: this.model.rows, styles}));
    }


}
export default TableComponent;
