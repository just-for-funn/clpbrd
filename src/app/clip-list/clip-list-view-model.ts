import { ClipModel } from '../services/clip-service';

export class ClipListViewModel{
    private rawData:ClipModel[] = [];
    private filteredData:ClipModel[];
    public filter:string = "";

    public onFilterChange():void{
        console.log("Filter changed" , this.filter);
    }
}