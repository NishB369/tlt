
export default function AdminHome() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome to the admin panel. Manage your content here.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards Placeholders */}
                {['Total Users', 'Active Novels', 'Pending Reviews'].map((stat) => (
                    <div key={stat} className="p-6 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{stat}</h3>
                        <p className="text-4xl font-black text-gray-900">0</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
