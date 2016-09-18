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
    var users = await request.get('https://api.github.com/users');

    for (let user of users.body){
        let userDetails = await request.get('https://api.github.com/users/'+user.id);
        console.log(userDetails.body.avatar_url)
        $("body").append('<img class="col-xs-1" src="'+userDetails.body.avatar_url+'"></img>')
    }
    setTimeout(function () {
        tableModel.addRow({id: 12, name: 'Mirek', age: 25})
    }, 2000)
}
