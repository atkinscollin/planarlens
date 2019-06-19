import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logger } from '@app/core';

const log = new Logger('CreateCube');

const maxFileSizePermitted = 50000;
@Component({
    selector: 'app-create-cube',
    templateUrl: './create-cube.component.html',
    styleUrls: ['./create-cube.component.scss']
})
export class CreateCubeComponent implements OnInit {
    createCubeForm!: FormGroup;
    isLoading = false;

    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.createForm();
    }

    ngOnInit() {}

    createCube() {
        // TODO - create service to be called, handle loading, redirect to cube on success.
        log.debug(`Not implemented: createCube().`);
    }

    onFileChange(files: File[]) {
        const reader = new FileReader();

        if (files && files.length && files.length === 1) {
            const file = files[0];

            if (file.size > maxFileSizePermitted) {
                // TODO - fix this so the error shows up even if it hasn't been touched.
                this.createCubeForm.get('cards').markAsDirty();
                this.createCubeForm.get('cards').setErrors({ fileSize: true });
            } else {
                reader.readAsText(file);
                reader.onloadend = () => {
                    this.createCubeForm.get('cards').setValue(reader.result);
                };
            }
        }
    }

    private createForm() {
        this.createCubeForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', null],
            cards: ['', null]
        });
    }
}
