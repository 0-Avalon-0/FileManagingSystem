import { Component, OnInit, DoCheck, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import {  File } from '../../../../../domain/file';
import { FileService } from '../../../../services/file/file.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private location:Location
  ) { }
  page = "project建议";
  listitle = "工程"
  pid: string;
  _pid: number;
  files: File[];
  file: File;
  selectedFile: File;
  parent_node = 'root';
  private destroy$ = new Subject();
  private slashIndex;

  clickSelectedFile(i: number): void {
    this.fileService.setCurrentIndex(i);
    this.selectedFile = this.files[i];
    if (this.selectedFile.file_property == 0) {
      this.router.navigate(['file']);
    }
    else if (this.selectedFile.file_property == 1) {
      this.parent_node += '%2F';
      this.parent_node += this.selectedFile.file_fname;
      this.fileService.setParentNode(this.parent_node);
      this.fileService.getMenus(this.parent_node, this._pid);
    }
  }

  back():void{
    this.slashIndex = this.parent_node.lastIndexOf('%');
    if(this.slashIndex!=-1){
      this.parent_node=this.parent_node.substring(0,this.slashIndex);
      this.fileService.setParentNode(this.parent_node);
      this.fileService.getMenus(this.parent_node, this._pid);
    }
    else{
      alert('Here is root');
    }
  }


  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.parent_node='root';
      this.pid = this.activatedRoute.snapshot.params['pid'];
      this._pid = parseInt(this.pid);
      this.fileService.setPid(this._pid);
      this.fileService.setParentNode(this.parent_node);
      this.fileService.getMenus(this.parent_node, this._pid);
      this.fileService.files$.pipe(takeUntil(this.destroy$)).subscribe(files=>{
        this.files = files;
      });
    });
  }

}
