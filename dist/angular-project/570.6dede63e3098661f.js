"use strict";(self.webpackChunkangular_project=self.webpackChunkangular_project||[]).push([[570],{7570:(I,u,o)=>{o.r(u),o.d(u,{ClasesModule:()=>M});var p=o(6814),r=o(7700),c=o(9157),l=o(6223),v=o(2396),m=o(2032),C=o(2296),h=o(1896),b=o(7398),e=o(5879),y=o(9862);let f=(()=>{class s{constructor(t){this._http=t,this.displayedColumns=["id","nombreClase","cantidadAlumnos","profesor","action"],this.clases=[]}addClase(t){return this._http.post("http://localhost:3000/clases",t)}updateClase(t,a){return this._http.put(`http://localhost:3000/clases/${t}`,a)}getClaseList(){return this._http.get("http://localhost:3000/clases")}deleteClase(t){return this._http.delete(`http://localhost:3000/clases/${t}`)}}return s.\u0275fac=function(t){return new(t||s)(e.LFG(y.eN))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),g=(()=>{class s{constructor(t,a,i){this._dialogRef=t,this._clasesService=a,this.data=i,this.nombreClaseControl=new l.NI(null,[l.kI.required]),this.cantidadAlumnosControl=new l.NI(null,[l.kI.required]),this.profesorControl=new l.NI(null,[l.kI.required]),this.claseForm=new l.cw({nombreClase:this.nombreClaseControl,cantidadAlumnos:this.cantidadAlumnosControl,profesor:this.profesorControl})}ngOnInit(){this.claseForm.patchValue(this.data)}onFormSubmit(){this.claseForm.valid&&(this.data?this._clasesService.updateClase(this.data.id,this.claseForm.value).subscribe({next:t=>{alert("Clase modificada."),this._dialogRef.close(!0)},error:t=>{console.error(t)}}):this._clasesService.addClase(this.claseForm.value).subscribe({next:t=>{alert("Clase agregada correctamente."),this._dialogRef.close(!0)},error:t=>{console.error(t)}}))}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(r.so),e.Y36(f),e.Y36(r.WI))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-class-add-edit"]],decls:24,vars:4,consts:[["mat-dialog-title",""],[3,"formGroup","ngSubmit"],["mat-dialog-content","",1,"content"],[1,"row"],["appearance","outline"],["matInput","","placeholder","Calculo","type","text","formControlName","nombreClase"],["matInput","","placeholder","356","type","numeric","formControlName","cantidadAlumnos"],["matInput","","placeholder","Diego Furrer","type","text","formControlName","profesor"],["mat-dialog-actions","",1,"action"],["mat-raised-button","","type","button",3,"mat-dialog-close"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(t,a){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Clases Form"),e.qZA()(),e.TgZ(3,"form",1),e.NdJ("ngSubmit",function(){return a.onFormSubmit()}),e.TgZ(4,"div",2)(5,"div",3)(6,"mat-form-field",4)(7,"mat-label"),e._uU(8,"Nombre de la Clase"),e.qZA(),e._UZ(9,"input",5),e.qZA(),e.TgZ(10,"mat-form-field",4)(11,"mat-label"),e._uU(12,"Cantidad Alumnos"),e.qZA(),e._UZ(13,"input",6),e.qZA()(),e.TgZ(14,"div",3)(15,"mat-form-field",4)(16,"mat-label"),e._uU(17,"Profesor"),e.qZA(),e._UZ(18,"input",7),e.qZA()()(),e.TgZ(19,"div",8)(20,"button",9),e._uU(21,"Cancel"),e.qZA(),e.TgZ(22,"button",10),e._uU(23),e.qZA()()()),2&t&&(e.xp6(3),e.Q6J("formGroup",a.claseForm),e.xp6(17),e.Q6J("mat-dialog-close",!1),e.xp6(2),e.Q6J("disabled",a.claseForm.invalid),e.xp6(1),e.Oqu(a.data?"Update":"Save"))},dependencies:[r.ZT,r.uh,r.xY,r.H8,c.KE,c.hX,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,C.lW,m.Nt],styles:[".content[_ngcontent-%COMP%]{padding-top:10px}.row[_ngcontent-%COMP%]{display:flex;gap:10px}.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.action[_ngcontent-%COMP%]{padding:0 25px 20px}.action[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1}"]}),s})();var A=o(6133),Z=o(2654);const S=function(){return[]},F=[{path:"table",component:(()=>{class s{constructor(t,a){this.clasesService=t,this.matDialog=a,this.titulo="Clases ABM",this.clases=this.clasesService.getClaseList(),this.displayedColumns=this.clasesService.displayedColumns}getClases(){this.clases=this.clasesService.getClaseList()}deleteClase(t){this.clasesService.deleteClase(t).subscribe({next:a=>{alert("Clase borrada."),this.getClases()},error:a=>{console.log(a)}})}createClase(){this.matDialog.open(g).afterClosed().subscribe({next:t=>{t&&this.getClases()}})}editClase(t){this.matDialog.open(g,{data:t}).afterClosed().subscribe({next:a=>{a&&(this.clasesService.updateClase(t,a),this.getClases())}})}applyFilter(t){const a=t.target.value;this.clases=this.clasesService.getClaseList().pipe((0,b.U)(i=>i.filter(d=>d.nombreClase.toLowerCase().startsWith(a.toLowerCase()))))}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(f),e.Y36(r.uw))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-clases"]],decls:3,vars:6,consts:[[3,"titulo","agregar"],[1,"largo",3,"dataSource","displayedColumns","deleteButton","editButton","applyFilter"]],template:function(t,a){1&t&&(e.TgZ(0,"app-navbar",0),e.NdJ("agregar",function(){return a.createClase()}),e.qZA(),e.TgZ(1,"app-table",1),e.NdJ("deleteButton",function(d){return a.deleteClase(d)})("editButton",function(d){return a.editClase(d)})("applyFilter",function(d){return a.applyFilter(d)}),e.ALo(2,"async"),e.qZA()),2&t&&(e.Q6J("titulo",a.titulo),e.xp6(1),e.Q6J("dataSource",e.lcZ(2,3,a.clases)||e.DdM(5,S))("displayedColumns",a.displayedColumns))},dependencies:[A.S,Z.a,p.Ov],styles:[".largo[_ngcontent-%COMP%]{display:block;max-width:1000px;margin:auto}"]}),s})()},{path:"**",redirectTo:"table"}];let T=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[h.Bz.forChild(F),h.Bz]}),s})(),M=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[p.ez,r.Is,c.lN,l.UX,v.m,m.c,C.ot,T]}),s})()}}]);