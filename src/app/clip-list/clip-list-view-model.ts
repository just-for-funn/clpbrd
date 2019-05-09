import { ClipModel } from '../services/clip-service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class ClipListViewModel{
  
    private clips: ClipModel [] = [];

    public filteredData:ClipModel[] = [];
    public filter:string = "";
    private filter$ = new Subject<string>();

    constructor(){
        this.filter$.pipe(debounceTime(250)).subscribe(filter =>this.doFilter(filter));
    }

    public onFilterChange(): void {
        console.log("Filter changed", this.filter);
        this.filter$.next(this.filter);
    }

    bindData(rows: ClipModel[]): void {
        this.clips = rows.sort((a, b) => b.rowNumber - a.rowNumber);
        this.doFilter(this.filter);
    }

    getMaxRow() {
        return this.clips.reduce((a, b) => a > b.rowNumber ? a : b.rowNumber, 0);
    }

    appendFront(cm: ClipModel) {
        this.clips.unshift(cm);
    }

    doFilter(filter:string){
        if(filter && filter.length >0)
            this.filteredData =  this.clips.filter(clip => clip.value.toLowerCase().includes(filter));
        else 
            this.filteredData = this.clips;
    }
}