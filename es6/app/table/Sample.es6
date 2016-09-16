"use strict";
import TableModel from './TableModel';
import TableComponent from './TableComponent';
export function showTable(target) {
    let tableModel = new TableModel();
    tableModel.defineColumn('id', 'name', 'age');

    tableModel.addRow({id: 1, name: 'Jan', age: 45});
    tableModel.addRow({id: 2, name: 'Marek', age: 35});
    tableModel.addRow({id: 3, name: 'Tomek', age: 25});

    let tableComponent = new TableComponent();
    tableComponent.bindWithModel(tableModel);

    tableComponent.renderTo(target);

    setTimeout(function () {
        tableModel.addRow({id: 12, name: 'Mirek', age: 25})
    }, 2000)

}
