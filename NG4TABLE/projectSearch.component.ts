import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectSearchService } from 'services/projectSearch.service';
import { ErrorHandlerService } from 'services/errorHandler.service';
import { Project } from "entities/Project";
import { MzModalService } from 'ng2-materialize';
import { CreateProjectModal } from './createproject/createproject.component';
import { AddApplicationModal } from './addapplication/addapplication.component';
import { DeleteProjectModal } from './deleteproject/deleteproject.component';

@Component({
    selector: 'projectSearch-page',
    templateUrl: './projectSearch.component.html'
})
export class ProjectSearchComponent implements OnInit, OnDestroy {
    isLoading: boolean;
    projectsSubscribe;
    selected: any;
    projects: any[] = [];
    private deleteProjectModal;
    public deleteProjectModalOptions: Materialize.ModalOptions = {
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        complete: () => { alert('Closed'); } // Callback for Modal close        
    };

    options = {
        theaders: ['projectCode', 'name', 'teamLead', 'devManagerName', 'goLive'],
        theadersNames: ['Código', 'Nombre', 'Team Lead', 'Dev Manager', 'Mantenance Window', 'Applications Affected'],
        enableGeneralSearch: false,
        enablePagination: false,
        showAddAction: false,
        showDeleteAction: false,
        showDetailAction: true,
        rowSelector: true,
        enableProjectSearch: true,
        actions: ['edit', 'detail']
    };

    constructor(
        private router: Router,
        private projectSearchService: ProjectSearchService,
        private errorService: ErrorHandlerService,
        private modalService: MzModalService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.projectsSubscribe = this.projectSearchService.projectsChange$.subscribe(
            (projects: Project[]) => {
                if (projects) {
                    this.projects = projects;
                    this.isLoading = false;
                } else {
                    this.projectSearchService.getAllProjects();
                }
            }
        )
    }

    ngOnDestroy() {
        this.projectsSubscribe.unsubscribe();
    }

    goToProject(project: any) {
        this.router.navigateByUrl('/projectSearch/' + project.id);
    }

    openCreateModal() {
        this.modalService.open(CreateProjectModal);
    }

    updateItemsSeleccionados(item) {
        this.selected = item;
    }

    deleteProject(item) {
        if (this.selected.length > 0) {
            this.openDeleteModal();
        }
    }

    openDeleteModal() {
        this.deleteProjectModalOptions['projectId'] = this.selected[0]['id'];
        this.deleteProjectModalOptions['projectName'] = this.selected[0]['name'];
        this.deleteProjectModal = this.modalService.open(DeleteProjectModal, this.deleteProjectModalOptions);
    }
}
