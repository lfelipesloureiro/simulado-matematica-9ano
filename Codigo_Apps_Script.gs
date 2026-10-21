/** Cole no Apps Script vinculado à planilha. Configure o gabarito abaixo antes de publicar. */
const ABA = 'Respostas';
// O professor deve preencher o gabarito oficial com 28 letras, sem espaços.
const GABARITO = 'CCCCACBCBBBCBDABBDAACCBBBABC'; // Gabarito do documento enviado
function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const p = JSON.parse(e.postData.contents);
    if (!p.nome || !['9º A','9º B'].includes(p.turma) || !/^\d{1,2}$/.test(String(p.numero)) || !Array.isArray(p.respostas) || p.respostas.length !== 28 || !p.respostas.every(a => a === '' || /^[A-E]$/.test(a))) throw Error('Dados inválidos');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
    if (sheet.getLastRow() === 0) sheet.appendRow(['Data/hora','Protocolo','Nome','Nº','Turma','Tempo (s)','Tempo esgotado',...Array.from({length:28},(_,i)=>'Q'+(i+1)),'Acertos','Percentual']);
    // Na questão 11, B (2/5) e D (4/10) são matematicamente equivalentes.
    const key = String(GABARITO).toUpperCase().replace(/\s/g,'');
    const validKey = /^[A-E]{28}$/.test(key);
    const hits = validKey ? p.respostas.reduce((s,a,i)=>s+((a===key[i] || (i===10 && a==='D'))?1:0),0) : '';
    const protocolo = Utilities.getUuid();
    sheet.appendRow([new Date(),protocolo,safe(p.nome),Number(p.numero),p.turma,Number(p.tempoSegundos)||0,Boolean(p.finalizadoPorTempo),...p.respostas,hits,validKey?hits/28:'']);
    if (validKey) sheet.getRange(sheet.getLastRow(),sheet.getLastColumn()).setNumberFormat('0.0%');
    return out({ok:true,protocolo,acertos:validKey?hits:null,total:28,nota:validKey?Number((hits*10/28).toFixed(2)):null});
  } catch(err) {return out({ok:false,error:String(err.message)});} finally {lock.releaseLock();}
}
function safe(v) {let s=String(v).slice(0,120).trim();return /^[=+@\-\t\r]/.test(s)?"'"+s:s;}
function out(obj) {return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
