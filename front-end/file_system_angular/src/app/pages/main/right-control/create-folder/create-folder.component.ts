import { Component, OnInit } from '@angular/core';
import { File ,CreateFileHolder} from '../../../../../domain/file';
import{FileService} from '../../../../services/file/file.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {
  createdFolder:File;

  thisFile:CreateFileHolder={
    file_property:1,
    file_text:''
  }

  create():void{
    this.fileService.createFile(this.thisFile,this.createdFolder.file_fname,this.createdFolder.pid,this.createdFolder.parent_node);
  }

  constructor(private fileService:FileService) { }

  ngOnInit() {
    this.createdFolder = new File(this.fileService.getPid(),'','',1,'')
  }

}
