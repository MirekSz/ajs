"use strict";


/**
 * Created by Mirek on 2016-02-16.
 */
class TableModel {


    constructor() {
        this.columns = [];
        this.rows = [];
    }

    /**
     *
     * @param columns
     */
    defineColumn(...columns) {
        this.columns = columns;
    }

    addRow(row) {
        this.rows.push(row);
        if (this.changeListener) {
            this.changeListener();
        }
    }

    addModelChangeListener(listener) {
        this.changeListener = listener;
    }

}

export default TableModel;
