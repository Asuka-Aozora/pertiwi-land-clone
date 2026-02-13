import Link from "next/link";
import { Home } from "lucide-react";
import axios from "axios";

// Type for project from API response
type Project = {
  id: number;
  name: string;
  slug: string;
  status: string;
  location: string | null;
  price_range: string | null;
  created_at: string;
};

type ApiResponse = {
  data: Project[];
};

async function getProjects(): Promise<Project[]> {
  try {
    const res = await axios.get<ApiResponse>(
      "http://localhost:3000/api/admin/projects",
      {
        headers: {
          "Cache-Control": "no-store", // Ensure fresh data
        },
      },
    );

    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex flex-col gap-6 mb-8">
        {/* Top Section: Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-500">
          <Link href="/admin/dashboard" className="hover:text-gray-900">
            <Home className="w-5 h-5" />
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-medium text-gray-900">Projects</span>
        </div>

        {/* Bottom Section: Title and Action */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Data Products</h1>
          <Link
            href="/admin/projects/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Add Project
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">No projects found</p>
          <Link
            href="/admin/projects/new"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {project.name}
                    </div>
                    <div className="text-sm text-gray-500">{project.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.location || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
