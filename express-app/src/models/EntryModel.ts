import { EntryLineModel } from "./EntryLineModel.js";

export class EntryModel {

    id: string;

    title: string;

    createdOn: string;

    listOfLines: Array<EntryLineModel>;

}