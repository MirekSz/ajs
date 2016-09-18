"use strict";
import TableModel from './TableModel';
import TableComponent from './TableComponent';
import request from 'superagent';
export async function showTable(target) {
    let tableModel = new TableModel();
    tableModel.defineColumn('id', 'name', 'age');

    tableModel.addRow({id: 1, name: 'Jan', age: 45});
    tableModel.addRow({id: 2, name: 'Marek', age: 35});
    tableModel.addRow({id: 3, name: 'Tomek', age: 25});

    let tableComponent = new TableComponent();
    tableComponent.bindWithModel(tableModel);

    tableComponent.renderTo(target);
    var users = await request.get('http://localhost:3100/users');

    for (let user of users.body) {
        let userDetails = await request.get('http://localhost:3100/users/' + user.id);
        for (let image of userDetails.body.images) {
            $("body").append('<img class="col-xs-1" src="' + image + '"></img>')
        }
    }
    setTimeout(function () {
        tableModel.addRow({id: 12, name: 'Mirek', age: 25})
    }, 2000)
}
