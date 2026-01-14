import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../data/projectsCatalog';
import { fetchRemoteProjectById, isSupabaseConfigured } from '../data/projectsRemote';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const getGitHubOgImage = (repoUrl) => {
    try {
      const u = new URL(String(repoUrl || ''));
      // Standard GitHub repo URL: https://github.com/owner/repo
      if (/github\.com$/i.test(u.hostname)) {
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 2) return '';
        const owner = parts[0];
        const repo = parts[1].replace(/\.git$/i, '');
        return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
      }

      // GitHub Pages URL: https://owner.github.io/repo/
      if (/\.github\.io$/i.test(u.hostname)) {
        const owner = u.hostname.replace(/\.github\.io$/i, '');
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 1) return '';
        const repo = parts[0];
        return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
      }

      return '';
    } catch {
      return '';
    }
  };

  const projectImage = project && project.image ? project.image : (project && project.repoUrl ? getGitHubOgImage(project.repoUrl) : '');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const catalog = getProjectById(id);
      if (catalog) {
        if (!cancelled) setProject(catalog);
        return;
      }

      // Try shared DB first
      try {
        if (isSupabaseConfigured()) {
          const remote = await fetchRemoteProjectById(id);
          if (remote) {
            if (!cancelled) setProject(remote);
            return;
          }
        }
      } catch (e) {
        // ignore and try local
      }

      // Fallback to local cache
      try {
        const raw = localStorage.getItem('dt_projects');
        const stored = raw ? JSON.parse(raw) : [];
        const found = Array.isArray(stored) ? stored.find((p) => String(p.id) === String(id)) : null;
        if (!cancelled) setProject(found || null);
      } catch (e) {
        if (!cancelled) setProject(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#DFDFDF]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold text-black" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>
            Project not found
          </h1>
          <p className="mt-2 text-black/70" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>
            We couldn't find a project with this ID. It may have been deleted or not saved yet.
          </p>
          <div className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 text-sm"
              style={{ fontFamily: 'Poppins, ui-sans-serif' }}
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DFDFDF]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-black font-semibold break-words"
            style={{ fontFamily: 'Poppins, ui-sans-serif' }}
          >
            {project.title || 'Untitled Project'}
          </h1>
          <Link
            to="/projects"
            className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-xs sm:text-sm text-black"
            style={{ fontFamily: 'Poppins, ui-sans-serif' }}
          >
            Back to Projects
          </Link>
        </div>

        {projectImage && (
          <div className="mb-6 w-full overflow-hidden rounded-2xl bg-black/5">
            <img src={projectImage} alt={project.title} className="w-full max-h-[360px] object-cover" />
          </div>
        )}

        <div className="text-sm sm:text-base text-black/70 mb-2" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>
          {project.category}
          {project.owner ? ` • ${project.owner}` : ''}
          {project.status ? ` • ${project.status}` : ''}
        </div>

        {project.repoUrl && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-3 text-xs sm:text-sm" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline break-all"
            >
              {project.repoUrl}
            </a>
            <button
              type="button"
              onClick={() => {
                if (project.repoUrl) window.location.href = project.repoUrl;
              }}
              className="mt-2 sm:mt-0 inline-flex items-center justify-center rounded-full bg-black text-white px-3 py-1 text-[11px] sm:text-xs hover:bg-black/90"
            >
              Launch project
            </button>
          </div>
        )}

        {(project.summary || (project.goal && project.goal.split('\n')[0])) && (
          <div className="mb-6 text-sm sm:text-base text-black/80 leading-relaxed" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>
            {project.summary || project.goal.split('\n')[0]}
          </div>
        )}

        {project.teamMemberFirstName && (
          <div className="mb-8 text-sm sm:text-base text-black/80" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>
            <span className="font-semibold">Team Member:</span>{' '}
            {project.teamMemberFirstName} {project.teamMemberLastName || ''}
            {project.teamMemberRole ? ` • ${project.teamMemberRole}` : ''}
            {project.teamMemberDescription && (
              <div className="mt-2 text-xs sm:text-sm text-black/70 whitespace-pre-wrap leading-relaxed">
                {project.teamMemberDescription}
              </div>
            )}
          </div>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm sm:text-base text-black"
          style={{ fontFamily: 'Poppins, ui-sans-serif' }}
        >
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Description</div>
            <div className="mt-2 whitespace-pre-wrap leading-relaxed">{project.description || project.goal || '-'}</div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Technical Stack</div>
            <div className="mt-2">
              {project.techStack ? (
                <div className="space-y-2">
                  {Object.entries(project.techStack).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key}:</span>{' '}
                      {Array.isArray(value) ? value.join(', ') : value}
                    </div>
                  ))}
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Key Features</div>
            <div className="mt-2">
              {project.features ? (
                <ul className="list-disc pl-5 space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Modules</div>
            <div className="mt-2">
              {project.modules ? (
                <div className="space-y-4">
                  {Object.entries(project.modules).map(([name, moduleData]) => (
                    <div key={name}>
                      <div className="font-medium capitalize">{name}</div>
                      <div className="text-sm text-black/70">{moduleData.description}</div>
                      {moduleData.components && (
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {moduleData.components.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Impact</div>
            <div className="mt-2">
              {project.impact ? (
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Metrics:</div>
                    <ul className="list-disc pl-5 mt-1">
                      {project.impact.metrics.map((metric, i) => (
                        <li key={`metric-${i}`}>{metric}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">Benefits:</div>
                    <ul className="list-disc pl-5 mt-1">
                      {project.impact.benefits.map((benefit, i) => (
                        <li key={`benefit-${i}`}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Data</div>
            <div className="mt-2">
              {project.data ? (
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Sources:</div>
                    <ul className="list-disc pl-5 mt-1">
                      {project.data.sources.map((source, i) => (
                        <li key={`source-${i}`}>{source}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">Types:</div>
                    <div className="mt-1">{project.data.types.join(', ')}</div>
                  </div>
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Roadmap</div>
            <div className="mt-2">
              {project.roadmap ? (
                <div className="space-y-4">
                  {project.roadmap.map((phase, i) => (
                    <div key={`phase-${i}`} className="border-l-2 pl-3 border-black/10">
                      <div className="font-medium">{phase.phase} <span className="text-sm font-normal text-black/60">({phase.status})</span></div>
                      <ul className="list-disc pl-5 mt-1">
                        {phase.items.map((item, j) => (
                          <li key={`phase-${i}-item-${j}`} className="text-sm">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Team</div>
            <div className="mt-2">
              {project.team ? (
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Team Members:</div>
                    <ul className="mt-1 space-y-2">
                      {project.team.members.map((member, i) => (
                        <li key={`member-${i}`}>
                          <span className="font-medium">{member.name}</span> • {member.role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">Collaboration:</div>
                    <ul className="list-disc pl-5 mt-1">
                      {project.team.collaboration.map((collab, i) => (
                        <li key={`collab-${i}`}>{collab}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-black/5 p-4">
            <div className="text-sm sm:text-base font-semibold tracking-wide uppercase text-black/80">Project Health</div>
            <div className="mt-2">
              {project.health ? (
                <div className="space-y-2">
                  <div><span className="font-medium">Status:</span> {project.health.status}</div>
                  <div><span className="font-medium">Last Deployed:</span> {project.health.lastDeployed}</div>
                  <div><span className="font-medium">Open Issues:</span> {project.health.openIssues}</div>
                  <div><span className="font-medium">Test Coverage:</span> {project.health.testCoverage}</div>
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
