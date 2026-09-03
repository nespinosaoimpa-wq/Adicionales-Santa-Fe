/**
 * Adicionales Santa Fe - Registro de Procedimiento
 * Step-by-step wizard con GPS, fotos y PDF
 */

let procData = {
    type: 'flagrancia',
    loc: '',
    lat: null,
    lng: null,
    people: [],
    items: [],
    photos: [],
    notes: ''
};

let currentStep = 1;
const totalSteps = 5;

function renderProcedimiento(container) {
    if (!container) container = document.getElementById('app');

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
            <button onclick="window._cancelProc()" class="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="flex flex-col">
                <h1 class="text-lg font-black text-white leading-none">Procedimiento</h1>
                <span class="text-[10px] text-primary font-bold uppercase tracking-widest">Asistente de Campo</span>
            </div>
            <div class="ml-auto text-xs font-bold text-slate-500" id="step-indicator">Paso 1/5</div>
        </header>

        <!-- Progress Bar -->
        <div class="w-full bg-white/5 h-1">
            <div id="proc-progress" class="bg-primary h-1 transition-all duration-300" style="width: 20%"></div>
        </div>

        <main class="p-4 pb-32 max-w-md mx-auto view-transition" id="proc-content">
            <!-- Step content injected here -->
        </main>

        <div class="fixed bottom-[70px] left-0 right-0 p-4 bg-background-dark/80 backdrop-blur-md border-t border-white/5 z-40">
            <div class="flex gap-3 max-w-md mx-auto">
                <button onclick="window._prevStep()" id="btn-prev" class="hidden px-4 py-3 rounded-2xl bg-white/5 text-white font-bold active:scale-95 transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <button onclick="window._nextStep()" id="btn-next" class="flex-1 py-3 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    Siguiente <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
        ${renderBottomNav('asistente')}
    `;

    renderStep();
}

function renderStep() {
    const content = document.getElementById('proc-content');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    document.getElementById('step-indicator').innerText = `Paso ${currentStep}/${totalSteps}`;
    document.getElementById('proc-progress').style.width = `${(currentStep / totalSteps) * 100}%`;

    btnPrev.classList.toggle('hidden', currentStep === 1);
    
    if (currentStep === totalSteps) {
        btnNext.innerHTML = '<span class="material-symbols-outlined">description</span> Generar PDF';
        btnNext.className = "flex-1 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all";
    } else {
        btnNext.innerHTML = 'Siguiente <span class="material-symbols-outlined text-sm">arrow_forward</span>';
        btnNext.className = "flex-1 py-3 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all";
    }

    switch(currentStep) {
        case 1: content.innerHTML = step1HTML(); break;
        case 2: content.innerHTML = step2HTML(); renderPeopleList(); break;
        case 3: content.innerHTML = step3HTML(); renderItemsList(); break;
        case 4: content.innerHTML = step4HTML(); renderPhotosList(); break;
        case 5: content.innerHTML = step5HTML(); break;
    }
}

// ── STEPS HTML ──

function step1HTML() {
    return `
        <div class="space-y-6 animate-fade-in">
            <div>
                <h2 class="text-lg font-bold text-white flex items-center gap-2"><span class="material-symbols-outlined text-primary">my_location</span> 1. Inicio y Ubicación</h2>
                <p class="text-[11px] text-slate-400">Datos básicos del procedimiento.</p>
            </div>

            <div class="space-y-4">
                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Tipo de Procedimiento</label>
                    <select id="p-type" onchange="procData.type = this.value" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none">
                        <option value="flagrancia" ${procData.type==='flagrancia'?'selected':''}>Delito en Flagrancia</option>
                        <option value="requisa" ${procData.type==='requisa'?'selected':''}>Requisa Personal/Vehicular</option>
                        <option value="allanamiento" ${procData.type==='allanamiento'?'selected':''}>Allanamiento</option>
                        <option value="hallazgo" ${procData.type==='hallazgo'?'selected':''}>Hallazgo</option>
                        <option value="otro" ${procData.type==='otro'?'selected':''}>Otro</option>
                    </select>
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Lugar del Hecho</label>
                    <div class="relative">
                        <input type="text" id="p-loc" value="${procData.loc}" onchange="procData.loc = this.value" placeholder="Ej: Av. San Martín 1500" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none pr-12">
                        <button type="button" onclick="window._getProcGPS()" class="absolute right-2 top-2 p-2 text-primary hover:text-blue-400 bg-primary/10 rounded-lg transition-colors flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">my_location</span>
                        </button>
                    </div>
                    ${procData.lat ? `<p class="text-[10px] text-emerald-400 ml-1">📍 GPS: ${procData.lat.toFixed(4)}, ${procData.lng.toFixed(4)}</p>` : ''}
                </div>

                <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-primary uppercase ml-1">Relato Breve (Notas)</label>
                    <textarea id="p-notes" onchange="procData.notes = this.value" placeholder="Describa brevemente la situación..." class="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none resize-none">${procData.notes}</textarea>
                </div>
            </div>
        </div>
    `;
}

function step2HTML() {
    return `
        <div class="space-y-6 animate-fade-in">
            <div>
                <h2 class="text-lg font-bold text-white flex items-center gap-2"><span class="material-symbols-outlined text-primary">group</span> 2. Personas</h2>
                <p class="text-[11px] text-slate-400">Aprehendidos, víctimas, testigos, etc.</p>
            </div>

            <div class="glass-card p-4 rounded-2xl border border-white/5 space-y-3">
                <select id="person-role" class="w-full bg-background-dark border border-white/10 rounded-xl p-3 text-xs text-white">
                    <option value="aprehendido">Aprehendido / Demorado</option>
                    <option value="victima">Víctima / Damnificado</option>
                    <option value="testigo">Testigo de Actuación</option>
                </select>
                <input type="text" id="person-name" placeholder="Nombre completo" class="w-full bg-background-dark border border-white/10 rounded-xl p-3 text-xs text-white">
                <input type="number" id="person-dni" placeholder="DNI" class="w-full bg-background-dark border border-white/10 rounded-xl p-3 text-xs text-white">
                <button onclick="window._addPerson()" class="w-full py-3 bg-white/10 text-white font-bold rounded-xl active:scale-95 text-xs">Añadir Persona</button>
            </div>

            <div id="people-list" class="space-y-2"></div>
        </div>
    `;
}

function step3HTML() {
    return `
        <div class="space-y-6 animate-fade-in">
            <div>
                <h2 class="text-lg font-bold text-white flex items-center gap-2"><span class="material-symbols-outlined text-primary">inventory_2</span> 3. Secuestros</h2>
                <p class="text-[11px] text-slate-400">Elementos, armas, vehículos, drogas.</p>
            </div>

            <div class="glass-card p-4 rounded-2xl border border-white/5 space-y-3">
                <input type="text" id="item-desc" placeholder="Descripción (Ej: Arma de fuego cal. 9mm)" class="w-full bg-background-dark border border-white/10 rounded-xl p-3 text-xs text-white">
                <input type="text" id="item-obs" placeholder="N° serie, estado, u observaciones..." class="w-full bg-background-dark border border-white/10 rounded-xl p-3 text-xs text-white">
                <button onclick="window._addItem()" class="w-full py-3 bg-white/10 text-white font-bold rounded-xl active:scale-95 text-xs">Añadir Elemento</button>
            </div>

            <div id="items-list" class="space-y-2"></div>
        </div>
    `;
}

function step4HTML() {
    return `
        <div class="space-y-6 animate-fade-in">
            <div>
                <h2 class="text-lg font-bold text-white flex items-center gap-2"><span class="material-symbols-outlined text-primary">photo_camera</span> 4. Fotografías</h2>
                <p class="text-[11px] text-slate-400">Las fotos se adjuntarán al PDF.</p>
            </div>

            <div class="flex justify-center">
                <label class="size-32 rounded-3xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-white/10 transition-all active:scale-95">
                    <span class="material-symbols-outlined text-4xl text-slate-400">add_a_photo</span>
                    <span class="text-xs text-slate-400 font-bold">Capturar</span>
                    <input type="file" accept="image/*" capture="environment" class="hidden" onchange="window._handlePhotoUpload(event)">
                </label>
            </div>

            <div id="photos-list" class="grid grid-cols-2 gap-3 mt-4"></div>
        </div>
    `;
}

function step5HTML() {
    return `
        <div class="space-y-6 animate-fade-in">
            <div>
                <h2 class="text-lg font-bold text-white flex items-center gap-2"><span class="material-symbols-outlined text-primary">fact_check</span> 5. Resumen Final</h2>
                <p class="text-[11px] text-slate-400">Verifique los datos antes de generar el PDF.</p>
            </div>

            <div class="glass-card p-5 rounded-3xl border border-primary/20 space-y-4">
                <div class="space-y-1">
                    <p class="text-[10px] text-primary font-bold uppercase">Tipo</p>
                    <p class="text-sm text-white capitalize">${procData.type}</p>
                </div>
                <div class="space-y-1">
                    <p class="text-[10px] text-primary font-bold uppercase">Lugar</p>
                    <p class="text-sm text-white">${procData.loc || 'No especificado'}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div class="text-center">
                        <span class="text-2xl font-black text-white">${procData.people.length}</span>
                        <p class="text-[10px] text-slate-400 uppercase">Personas</p>
                    </div>
                    <div class="text-center">
                        <span class="text-2xl font-black text-white">${procData.items.length}</span>
                        <p class="text-[10px] text-slate-400 uppercase">Secuestros</p>
                    </div>
                </div>
                
                <div class="pt-4 border-t border-white/10 text-center">
                    <span class="text-xl font-black text-white">${procData.photos.length}</span>
                    <p class="text-[10px] text-slate-400 uppercase">Fotografías adjuntas</p>
                </div>
            </div>

            <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
                <span class="material-symbols-outlined text-amber-500 text-lg mt-0.5">warning</span>
                <p class="text-[11px] text-amber-200/80 leading-relaxed">
                    Al generar el PDF, la información quedará sellada. Asegúrese de haber completado todos los pasos necesarios.
                </p>
            </div>
        </div>
    `;
}

// ── LOGIC FUNCTIONS ──

window._cancelProc = () => {
    if(confirm('¿Seguro que desea cancelar? Se perderán los datos ingresados.')){
        procData = { type: 'flagrancia', loc: '', lat: null, lng: null, people: [], items: [], photos: [], notes: '' };
        currentStep = 1;
        router.navigateTo('#asistente');
    }
}

window._prevStep = () => {
    if (currentStep > 1) {
        currentStep--;
        renderStep();
    }
}

window._nextStep = () => {
    if (currentStep === 1) {
        procData.loc = document.getElementById('p-loc').value;
        procData.notes = document.getElementById('p-notes').value;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        renderStep();
    } else {
        generateProcedurePDF();
    }
}

window._getProcGPS = () => {
    if (!navigator.geolocation) return showToast("GPS no soportado");
    showToast("Localizando...");
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            procData.lat = pos.coords.latitude;
            procData.lng = pos.coords.longitude;
            document.getElementById('p-loc').value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
            procData.loc = document.getElementById('p-loc').value;
            showToast("✅ GPS guardado");
            renderStep();
        },
        (err) => { showToast("❌ Error GPS"); },
        { enableHighAccuracy: true }
    );
}

window._addPerson = () => {
    const role = document.getElementById('person-role').value;
    const name = document.getElementById('person-name').value.trim();
    const dni = document.getElementById('person-dni').value.trim();
    if(!name) return showToast('Ingrese un nombre');
    
    procData.people.push({ id: Date.now(), role, name, dni });
    document.getElementById('person-name').value = '';
    document.getElementById('person-dni').value = '';
    renderPeopleList();
}

window._removePerson = (id) => {
    procData.people = procData.people.filter(p => p.id !== id);
    renderPeopleList();
}

function renderPeopleList() {
    const list = document.getElementById('people-list');
    if(!list) return;
    list.innerHTML = procData.people.map(p => `
        <div class="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div>
                <span class="text-[9px] uppercase font-bold text-primary block">${p.role}</span>
                <span class="text-xs text-white font-medium">${p.name}</span>
                ${p.dni ? `<span class="text-[10px] text-slate-400 ml-2">DNI ${p.dni}</span>` : ''}
            </div>
            <button onclick="window._removePerson(${p.id})" class="text-red-400 p-2"><span class="material-symbols-outlined text-sm">delete</span></button>
        </div>
    `).join('');
}

window._addItem = () => {
    const desc = document.getElementById('item-desc').value.trim();
    const obs = document.getElementById('item-obs').value.trim();
    if(!desc) return showToast('Ingrese descripción');
    
    procData.items.push({ id: Date.now(), desc, obs });
    document.getElementById('item-desc').value = '';
    document.getElementById('item-obs').value = '';
    renderItemsList();
}

window._removeItem = (id) => {
    procData.items = procData.items.filter(i => i.id !== id);
    renderItemsList();
}

function renderItemsList() {
    const list = document.getElementById('items-list');
    if(!list) return;
    list.innerHTML = procData.items.map(i => `
        <div class="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div>
                <span class="text-xs text-white font-medium">${i.desc}</span>
                ${i.obs ? `<span class="text-[10px] text-slate-400 block">${i.obs}</span>` : ''}
            </div>
            <button onclick="window._removeItem(${i.id})" class="text-red-400 p-2"><span class="material-symbols-outlined text-sm">delete</span></button>
        </div>
    `).join('');
}

window._handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    showToast("⏳ Procesando imagen...");
    
    // Convert to base64 for PDF and preview
    const reader = new FileReader();
    reader.onload = async (event) => {
        const compressed = await compressImage(event.target.result);
        procData.photos.push({
            id: Date.now(),
            dataUrl: compressed,
            name: file.name
        });
        renderPhotosList();
    };
    reader.readAsDataURL(file);
}

window._removePhoto = (id) => {
    procData.photos = procData.photos.filter(p => p.id !== id);
    renderPhotosList();
}

function renderPhotosList() {
    const list = document.getElementById('photos-list');
    if(!list) return;
    list.innerHTML = procData.photos.map(p => `
        <div class="relative rounded-xl overflow-hidden aspect-square border border-white/10 group">
            <img src="${p.dataUrl}" class="w-full h-full object-cover">
            <button onclick="window._removePhoto(${p.id})" class="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="material-symbols-outlined text-[12px]">close</span>
            </button>
        </div>
    `).join('');
}

// ── PDF GENERATION ──
async function generateProcedurePDF() {
    showToast("Generando PDF estructurado...");
    const btn = document.getElementById('btn-next');
    btn.innerHTML = `<span class="animate-pulse">Procesando...</span>`;
    
    // We rely on jsPDF loaded from index.html
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const userName = store.user?.name || 'FUNCIONARIO';
        const dateStr = new Date().toLocaleString('es-AR');

        // Header
        doc.setFontSize(10);
        doc.text("POLICÍA DE LA PROVINCIA DE SANTA FE", 105, 20, { align: "center" });
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("ACTA DE PROCEDIMIENTO - REGISTRO DIGITAL", 105, 30, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        let y = 45;

        // Basics
        doc.text(`Fecha y Hora: ${dateStr}`, 15, y); y+=8;
        doc.text(`Tipo de Procedimiento: ${procData.type.toUpperCase()}`, 15, y); y+=8;
        doc.text(`Lugar del Hecho: ${procData.loc}`, 15, y); y+=8;
        if(procData.lat) {
            doc.text(`Coordenadas GPS: ${procData.lat.toFixed(5)}, ${procData.lng.toFixed(5)}`, 15, y); y+=8;
        }
        doc.text(`Personal Interviniente: ${userName}`, 15, y); y+=15;

        // Notes
        doc.setFont("helvetica", "bold");
        doc.text("RELATO DE LOS HECHOS:", 15, y); y+=8;
        doc.setFont("helvetica", "normal");
        const notesLines = doc.splitTextToSize(procData.notes || 'Sin observaciones.', 180);
        doc.text(notesLines, 15, y);
        y += (notesLines.length * 6) + 10;

        // People
        if (procData.people.length > 0) {
            if(y > 250) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.text("PERSONAS INVOLUCRADAS:", 15, y); y+=8;
            doc.setFont("helvetica", "normal");
            procData.people.forEach(p => {
                doc.text(`- ${p.role.toUpperCase()}: ${p.name} (DNI: ${p.dni || 'S/D'})`, 20, y); y+=8;
            });
            y+=5;
        }

        // Items
        if (procData.items.length > 0) {
            if(y > 250) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.text("ELEMENTOS SECUESTRADOS:", 15, y); y+=8;
            doc.setFont("helvetica", "normal");
            procData.items.forEach(i => {
                doc.text(`- ${i.desc} ${i.obs ? `(${i.obs})` : ''}`, 20, y); y+=8;
            });
            y+=5;
        }

        // Add photos logic (basic scaling)
        if (procData.photos.length > 0) {
            doc.addPage();
            y = 20;
            doc.setFont("helvetica", "bold");
            doc.text("ANEXO FOTOGRÁFICO:", 15, y); y+=15;
            
            for (let i=0; i<procData.photos.length; i++) {
                if(y > 200) { doc.addPage(); y = 20; }
                const img = procData.photos[i].dataUrl;
                // Add image (x, y, w, h) - roughly sizing to fit 2 per page
                doc.addImage(img, 'JPEG', 40, y, 130, 90);
                y += 100;
            }
        }

        // Footer signatures
        if(y > 220) { doc.addPage(); y = 20; }
        y += 30;
        doc.text("_________________________", 105, y, { align: "center" });
        y += 6;
        doc.text(`Firma Funcionario`, 105, y, { align: "center" });

        // Save
        const filename = `Procedimiento_${procData.type}_${Date.now()}.pdf`;
        doc.save(filename);
        
        showToast("✅ PDF generado correctamente");
        
        // Save metadata to local archive
        const saved = JSON.parse(localStorage.getItem('police_procedures') || '[]');
        saved.unshift({ 
            id: Date.now().toString(),
            type: procData.type,
            loc: procData.loc,
            date: new Date().toISOString(),
            peopleCount: procData.people.length,
            itemsCount: procData.items.length
        });
        localStorage.setItem('police_procedures', JSON.stringify(saved));
        
        // Sync with Supabase in background if available
        if (window.DB && typeof window.DB.saveProcedure === 'function') {
            window.DB.saveProcedure(procData);
        }
        
        btn.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Completado`;
        setTimeout(() => { router.navigateTo('#asistente'); }, 2000);

    } catch (e) {
        console.error(e);
        showToast("❌ Error al generar PDF. Verifique conexión.");
        btn.innerHTML = `<span class="material-symbols-outlined">description</span> Generar PDF`;
    }
}

window.renderProcedimiento = renderProcedimiento;
