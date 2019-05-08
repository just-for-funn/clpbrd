import { ClipModel } from '../services/clip-service';

export class ClipListViewModel{
  
    public clips: ClipModel [] = [];

    private filteredData:ClipModel[] = [];
    public filter:string = "";

    public onFilterChange(): void {
        console.log("Filter changed", this.filter);
    }

    bindData(rows: ClipModel[]): void {
        this.clips = rows.sort((a, b) => b.rowNumber - a.rowNumber);
    }

    getMaxRow() {
        return this.clips.reduce((a, b) => a > b.rowNumber ? a : b.rowNumber, 0);
    }

    appendFront(cm: ClipModel) {
        this.clips.unshift(cm);
    }
}