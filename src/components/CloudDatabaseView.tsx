import React, { useState } from 'react';
import {
  Database,
  Download,
  Search,
  Filter,
  ShieldCheck,
  Trash2,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  FileJson,
  FileText,
  X,
  School,
  HardDrive,
} from 'lucide-react';
import { SurveyResponse, LocalDatabaseStats } from '../types/survey';
import { exportSurveyRecordsToPDF } from '../utils/pdfExport';

interface CloudDatabaseViewProps {
  surveys: SurveyResponse[];
  dbStats?: LocalDatabaseStats | null;
  onDeleteSurvey: (id: string) => void;
  onClearAllSurveys?: () => void;
  onRefresh: () => void;
}

export const CloudDatabaseView: React.FC<CloudDatabaseViewProps> = ({
  surveys,
  dbStats,
  onDeleteSurvey,
  onClearAllSurveys,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [municipalityFilter, setMunicipalityFilter] = useState<string>('all');
  const [strandFilter, setStrandFilter] = useState<string>('all');
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyResponse | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filtered surveys
  const filteredSurveys = surveys.filter((item) => {
    const matchesSearch =
      (item.respondentName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      item.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.preferredProgramToEnroll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMun =
      municipalityFilter === 'all' || item.municipality === municipalityFilter;

    const matchesStrand =
      strandFilter === 'all' || item.academicStrand === strandFilter;

    return matchesSearch && matchesMun && matchesStrand;
  });

  const handleDownload = (format: 'csv' | 'json' | 'sql') => {
    window.location.href = `/api/database/export?format=${format}`;
  };

  const handleExportPDF = () => {
    exportSurveyRecordsToPDF(surveys);
  };

  return (
    <div className="space-y-6">
      {/* Local Health & Security Stats Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-xl p-6 text-white border border-slate-700 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
                Local Secure Database Active
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                Storage: Local Disk & Fast Cache
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              ASCOT Casiguran Feasibility Survey Records
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Survey responses from senior high school respondents in the DICADI catchment are stored locally
              with tamper-proof cryptographic SHA-256 signatures. Complete export in PDF, CSV, JSON, and SQL.
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Prominent PDF Export Button */}
            <button
              onClick={handleExportPDF}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => handleDownload('csv')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleDownload('json')}
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
            >
              <FileJson className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => handleDownload('sql')}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
            >
              <FileCode className="w-4 h-4" />
              <span>Export SQL Dump</span>
            </button>
            {onClearAllSurveys && surveys.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80 font-semibold text-xs px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Clear All Data</span>
              </button>
            )}
          </div>
        </div>

        {/* Telemetry Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/80 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Local Records</span>
            <span className="text-lg font-bold text-amber-400 font-mono">{surveys.length}</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Storage Location</span>
            <span className="text-slate-200 font-semibold font-mono truncate block">./data/surveys.json</span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Data Integrity</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Cryptographic Hash
            </span>
          </div>
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Offline Resilience</span>
            <span className="text-sky-300 font-semibold font-mono">Zero Latency Local Store</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search respondent, school, program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Municipality:</span>
            <select
              value={municipalityFilter}
              onChange={(e) => setMunicipalityFilter(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none"
            >
              <option value="all">All (DICADI)</option>
              <option value="Casiguran">Casiguran</option>
              <option value="Dinalungan">Dinalungan</option>
              <option value="Dilasag">Dilasag</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold">Strand:</span>
            <select
              value={strandFilter}
              onChange={(e) => setStrandFilter(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none"
            >
              <option value="all">All Strands</option>
              <option value="STEM">STEM</option>
              <option value="ABM">ABM</option>
              <option value="HUMSS">HUMSS</option>
              <option value="GAS">GAS</option>
              <option value="TVL">TVL</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 ml-auto font-medium">
            Showing <strong className="text-slate-800">{filteredSurveys.length}</strong> of{' '}
            <strong className="text-slate-800">{surveys.length}</strong> records
          </div>
        </div>
      </div>

      {/* Main Local Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Record ID & Hash</th>
                <th className="py-3 px-4">Respondent / School</th>
                <th className="py-3 px-4">Municipality</th>
                <th className="py-3 px-4">Strand</th>
                <th className="py-3 px-4">Preferred Degree Program</th>
                <th className="py-3 px-4">Enroll Intent</th>
                <th className="py-3 px-4">BS Fisheries</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSurveys.length > 0 ? (
                filteredSurveys.map((survey) => (
                  <tr
                    key={survey.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedSurvey(survey)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-800">{survey.id}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        {survey.localVerificationHash}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">
                        {survey.respondentName || 'Anonymous Respondent'}
                      </div>
                      <div className="text-slate-500 text-[11px] truncate max-w-[200px]">
                        {survey.schoolName} ({survey.gradeLevel})
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          survey.municipality === 'Casiguran'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : survey.municipality === 'Dinalungan'
                            ? 'bg-sky-100 text-sky-900 border border-sky-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {survey.municipality}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-800 font-mono font-semibold px-2 py-0.5 rounded border border-slate-200">
                        {survey.academicStrand}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900 truncate max-w-[220px]">
                        {survey.preferredProgramToEnroll}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[220px]">
                        Reason: {survey.mainReasonForAscot}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          survey.wouldConsiderEnrolling === 'Yes'
                            ? 'bg-emerald-100 text-emerald-800'
                            : survey.wouldConsiderEnrolling === 'Maybe'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {survey.wouldConsiderEnrolling}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            survey.pursuingBSFisheriesDegree === 'Yes'
                              ? 'bg-emerald-500'
                              : survey.pursuingBSFisheriesDegree === 'Maybe'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span className="text-slate-700 font-medium">
                          {survey.pursuingBSFisheriesDegree} (At Casiguran: {survey.takeBSFisheriesAtCasiguran})
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedSurvey(survey)}
                          title="View Full Questionnaire"
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteSurvey(survey.id)}
                          title="Delete Record from Local Database"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Database className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium text-slate-600">No matching survey records found in local database.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try clearing search filters or add a new survey via the Input tab.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Inspector Modal */}
      {selectedSurvey && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="sticky top-0 bg-slate-900 text-white p-5 rounded-t-2xl flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">ASCOT Survey Record Dossier</h3>
                    <span className="text-[10px] bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded border border-slate-700">
                      {selectedSurvey.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Local Hash: {selectedSurvey.localVerificationHash}</span>
                    <span>•</span>
                    <span>Storage: Local Database</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSurvey(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs text-slate-700">
              {/* Section I */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  I. RESPONDENT PROFILE
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block">Respondent Name:</span>
                    <strong className="text-slate-900">{selectedSurvey.respondentName || 'Anonymous'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">School Name:</span>
                    <strong className="text-slate-900">{selectedSurvey.schoolName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Municipality:</span>
                    <strong className="text-indigo-700">{selectedSurvey.municipality} (DICADI Area)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Grade Level:</span>
                    <strong className="text-slate-900">{selectedSurvey.gradeLevel}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Academic Strand:</span>
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                      {selectedSurvey.academicStrand}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section II */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  II. PROGRAMS YOU WOULD LIKE ASCOT–CASIGURAN CAMPUS TO OFFER
                </h4>
                <div className="space-y-1.5">
                  {selectedSurvey.programsOfferWishlist.map((prog, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2 rounded border border-slate-200 text-slate-900 font-medium flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section III */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  III. PROGRAM YOU WOULD ENROLL IN
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block">Program Most Likely To Enroll In:</span>
                    <strong className="text-slate-900 text-sm">{selectedSurvey.preferredProgramToEnroll}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Consider Enrolling at Casiguran Campus:</span>
                    <span
                      className={`inline-block font-bold px-2 py-0.5 rounded mt-0.5 ${
                        selectedSurvey.wouldConsiderEnrolling === 'Yes'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedSurvey.wouldConsiderEnrolling === 'Maybe'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {selectedSurvey.wouldConsiderEnrolling}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block mb-1">Reasons For Choosing ASCOT (Selected up to 3):</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedSurvey.mainReasonsForAscot && selectedSurvey.mainReasonsForAscot.length > 0
                        ? selectedSurvey.mainReasonsForAscot
                        : selectedSurvey.mainReasonForAscot.split(', ')
                      ).map((reason, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-100 text-amber-900 font-semibold px-2.5 py-1 rounded text-xs border border-amber-200"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section IV */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
                  IV. INTEREST IN BACHELOR OF SCIENCE IN FISHERIES
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block">Pursue BS Fisheries Degree:</span>
                    <strong className="text-slate-900">{selectedSurvey.pursuingBSFisheriesDegree}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Take at ASCOT-Casiguran:</span>
                    <strong className="text-slate-900">{selectedSurvey.takeBSFisheriesAtCasiguran}</strong>
                  </div>
                </div>
                {selectedSurvey.ifNotCasiguranPreferredSchool && (
                  <div className="p-2.5 bg-white border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px]">Alternative Preference & Reason:</span>
                    <div>
                      {selectedSurvey.ifNotCasiguranPreferredSchool} — {selectedSurvey.ifNotCasiguranReason}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block mb-1">Encouraging Factors for Enrollment:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSurvey.factorsEncouragingFisheries.map((f, i) => (
                      <span
                        key={i}
                        className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedSurvey(null)}
                  className="bg-slate-900 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear Database Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Clear All Database Records?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Are you sure you want to permanently delete all {surveys.length} survey responses from the local database? This action will remove all respondent records.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowClearConfirm(false);
                  if (onClearAllSurveys) {
                    onClearAllSurveys();
                  }
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Clear All Records</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
