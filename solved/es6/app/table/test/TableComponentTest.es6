var expect = chai.expect;

import TableComponent from '../TableComponent';
import TableModel from '../TableModel';

describe('Table tests', function () {
    afterEach(function cleaning() {
        $("#workspace").empty();
    });
    it('should execute table test', function () {
        //given
        let tableComponent = new TableComponent('Simple table');

        let tableModel = new TableModel();
        tableModel.defineColumn('id', 'name', 'age');

        tableModel.addRow({id: 1, name: 'Jan', age: 45});
        tableModel.addRow({id: 2, name: 'Marek', age: 35});
        tableModel.addRow({id: 3, name: 'Tomek', age: 25});

        tableComponent.bindWithModel(tableModel);


        //when
        tableComponent.renderTo($("#workspace"));
        //then
        expect($("#workspace table tbody tr")).to.have.length(4);
    });

    it('should bind with model', function () {
        let tableComponent = new TableComponent('mirek');
        expect(tableComponent).not.be.eq(undefined);
    });
});

