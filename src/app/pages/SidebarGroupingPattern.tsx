import { useState } from 'react';
import { Activity, Database, Download, SlidersHorizontal } from 'lucide-react';

const groups = [
    { id: 'data', title: 'Data', icon: Database },
    { id: 'preprocessing', title: 'Preprocessing', icon: SlidersHorizontal },
    { id: 'fitting', title: 'Peak Fitting', icon: Activity },
    { id: 'results', title: 'Results', icon: Download },
] as const;

type Group = (typeof groups)[number]['id'];
type Setting =
    | 'dataset'
    | 'channel'
    | 'background'
    | 'smoothing'
    | 'model'
    | 'peaks'
    | 'format'
    | 'destination';

type Control = {
    id: Setting;
    group: Group;
    label: string;
    options: string[];
};

const controls: Control[] = [
    {
        id: 'dataset',
        group: 'data',
        label: 'Dataset',
        options: ['Ni reference', 'Cu reference', 'Sample scan'],
    },
    {
        id: 'channel',
        group: 'data',
        label: 'Signal channel',
        options: ['Fluorescence', 'Transmission'],
    },
    {
        id: 'background',
        group: 'preprocessing',
        label: 'Background subtraction',
        options: ['Linear', 'Polynomial', 'None'],
    },
    {
        id: 'smoothing',
        group: 'preprocessing',
        label: 'Smoothing window',
        options: ['5 points', '9 points', '15 points'],
    },
    {
        id: 'model',
        group: 'fitting',
        label: 'Peak model',
        options: ['Gaussian', 'Lorentzian', 'Voigt'],
    },
    { id: 'peaks', group: 'fitting', label: 'Number of peaks', options: ['1', '2', '3'] },
    { id: 'format', group: 'results', label: 'Export format', options: ['CSV', 'JSON', 'TSV'] },
    {
        id: 'destination',
        group: 'results',
        label: 'Output contents',
        options: ['Fit parameters', 'Processed signal', 'Both'],
    },
];

const actions: Record<Group, string> = {
    data: 'Load Dataset',
    preprocessing: 'Apply Preprocessing',
    fitting: 'Run Peak Fit',
    results: 'Preview Export',
};

// The original interleaves unrelated controls and gives every row equal emphasis.
const ungroupedOrder: (Setting | Group)[] = [
    'dataset',
    'format',
    'model',
    'background',
    'results',
    'channel',
    'peaks',
    'destination',
    'data',
    'smoothing',
    'fitting',
    'preprocessing',
];

function AnalysisSidebar({ grouped }: { grouped: boolean }) {
    const [values, setValues] = useState<Record<Setting, string>>({
        dataset: 'Ni reference',
        channel: 'Fluorescence',
        background: 'Linear',
        smoothing: '5 points',
        model: 'Gaussian',
        peaks: '1',
        format: 'CSV',
        destination: 'Fit parameters',
    });
    const [message, setMessage] = useState('Adjust the settings, then choose an analysis action.');

    function runAction(group: Group) {
        const messages: Record<Group, string> = {
            data: `${values.dataset} selected with the ${values.channel.toLowerCase()} channel.`,
            preprocessing: `Preprocessing preview: ${values.background.toLowerCase()} background subtraction and a ${values.smoothing} smoothing window.`,
            fitting: `Fit preview: ${values.peaks} peak(s) using the ${values.model} model.`,
            results: `Export preview: ${values.destination.toLowerCase()} in ${values.format} format.`,
        };
        setMessage(messages[group]);
    }

    function renderSetting(control: Control) {
        return (
            <label className="analysis-sidebar-setting" key={control.id}>
                {control.label}
                <select
                    value={values[control.id]}
                    onChange={(event) =>
                        setValues((current) => ({ ...current, [control.id]: event.target.value }))
                    }
                >
                    {control.options.map((option) => (
                        <option key={option}>{option}</option>
                    ))}
                </select>
            </label>
        );
    }

    function renderAction(group: Group) {
        return (
            <button type="button" key={group} onClick={() => runAction(group)}>
                {actions[group]}
            </button>
        );
    }

    return (
        <section
            className="pattern-demo analysis-grouping-demo"
            aria-label={grouped ? 'Grouped analysis controls' : 'Ungrouped analysis controls'}
        >
            <h2>Science Analysis</h2>
            <div className="analysis-demo-workspace">
                <aside
                    className={`analysis-sidebar${grouped ? ' analysis-sidebar-grouped' : ''}`}
                    aria-label="Analysis settings"
                >
                    {grouped
                        ? groups.map(({ id, title, icon: Icon }) => (
                              <section
                                  className="analysis-sidebar-group"
                                  aria-label={title}
                                  key={id}
                              >
                                  <h3>
                                      <Icon size={18} aria-hidden="true" />
                                      {title}
                                  </h3>
                                  {controls
                                      .filter((control) => control.group === id)
                                      .map(renderSetting)}
                                  {renderAction(id)}
                              </section>
                          ))
                        : ungroupedOrder.map((id) => {
                              const control = controls.find((item) => item.id === id);
                              return control ? renderSetting(control) : renderAction(id as Group);
                          })}
                </aside>
                <div className="analysis-preview">
                    <h3>Analysis preview</h3>
                    <p className="analysis-preview-caption">Reference signal</p>
                    <svg
                        viewBox="0 0 240 150"
                        role="img"
                        aria-label="Illustrative signal with one peak"
                    >
                        <path d="M25 15V125H230" fill="none" stroke="#a4afbd" />
                        <path
                            d="M25 111L43 109L60 112L76 105L88 88L100 51L112 28L124 48L136 87L150 104L169 111L190 108L211 111L230 109"
                            fill="none"
                            stroke="#1764a1"
                            strokeWidth="3"
                        />
                        <text x="130" y="145" textAnchor="middle" fontSize="11" fill="#626a74">
                            Energy
                        </text>
                    </svg>
                    <p className="analysis-preview-caption">Interactive settings demo</p>
                    <p className="analysis-action-status" role="status">
                        {message}
                    </p>
                </div>
            </div>
        </section>
    );
}

export function UngroupedAnalysisSidebar() {
    return <AnalysisSidebar grouped={false} />;
}

export function GroupedAnalysisSidebar() {
    return <AnalysisSidebar grouped />;
}
