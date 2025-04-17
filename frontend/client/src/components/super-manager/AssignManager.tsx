import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, UserCheck } from "lucide-react";
import { fetchEmployeesApi, fetchManagersApi } from "@/service/superManagerApi";
import Swal from "sweetalert2";
import { Pagination } from "../Pagination";
import { Employee, Manager } from "@/utils/roles.types";
import { Table, TableColumn } from "../Table";
import EmployeeDetailModal from "./EmployeeDetails";
import ManagerAssignment from "./ManagerAssignment";
import { Loader } from "../Loader";

const employees = [
    {
        id: 1,
        name: "Asif Rahman",
        email: "asif@example.com",
        role: "Software Engineer",
        manager: "John Doe",
    },
    {
        id: 2,
        name: "Sarah Khan",
        email: "sarah@example.com",
        role: "Product Manager",
        manager: "Jane Smith",
    },
];



const AssignManager = () => {
    const [tab, setTab] = React.useState("employees");
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const employeesPerPage = 6
    const [employees, setEmployees] = useState<Employee[] | null>([])
    const [managers, setManagers] = useState<Manager[] | []>([])
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [showManagerAssignment, setShowManagerAssignment] = useState(false);


    const fetchEmployees = async (currentPage: number) => {
        try {
            setLoading(true);
            const response = await fetchEmployeesApi({ page: currentPage, limit: employeesPerPage });
            if (response?.status === 200) {
                const { data } = response;
                setEmployees(data.employees)
                setLoading(false);
                setTotalPages(
                    prev => (prev !== Math.ceil(data.totalEmployees / employeesPerPage)
                        ? Math.ceil(data.totalEmployees / employeesPerPage)
                        : prev)
                );
            }
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        } finally {
            setLoading(false)
        }
    };

    const fetchManagers = async (currentPage: number) => {
        try {
            setLoading(true);
            const response = await fetchManagersApi(undefined);
            if (response?.status === 200) {
                const { data } = response;
                setManagers(data.managers)
            }
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);
    useEffect(() => {
        fetchManagers(currentPage);
    }, []);

    const columns: TableColumn<Employee>[] = [
        { header: 'Name', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Role', accessor: 'role' },
        {
            header: 'Actions',
            actions: (employee) => (
                <button
                    onClick={() => onAssignManager(employee)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-sm"
                >
                    <UserCheck className="w-3.5 h-3.5" />
                    Assign Manager
                </button>
            )
        }
    ];


    function onAssignManager(employee: Employee) {
        console.log("Employee from the onAssignManger click: :", employee);
        setSelectedEmployee(employee)
        setShowManagerAssignment(true)
    }



    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Employee Management</h1>
                <div className="flex gap-2 bg-gray-100 rounded-md p-1">
                    <button
                        className={`px-4 py-1 rounded-md text-sm ${tab === "employees" ? "bg-white shadow" : ""}`}
                        onClick={() => setTab("employees")}
                    >
                        Employees
                    </button>
                    <button
                        className={`px-4 py-1 rounded-md text-sm ${tab === "managers" ? "bg-white shadow" : ""}`}
                        onClick={() => setTab("managers")}
                    >
                        Managers
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                    <Loader message="Fetching Employees" size="md" />
                </div>
            ) : (
                <Table
                    data={employees || []}
                    columns={columns}
                />
            )}

            {/* <Table
                data={employees || []}
                columns={columns}
            /> */}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-4"
            />

            {tab === "managers" && (
                <div className="border rounded-lg shadow-sm bg-white">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Manager View</h2>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-500">Coming soon...</p>
                    </div>
                </div>
            )}
            // Add this component to your return statement
            {showManagerAssignment && selectedEmployee && (
                <ManagerAssignment
                    employee={selectedEmployee}
                    onClose={() => setShowManagerAssignment(false)}
                    onSuccess={() => {
                        fetchEmployees(currentPage);
                        console.log("<Manager> Assigned :")
                    }
                    } // Refresh the list
                    managers={managers}
                />
            )}
        </div>
    );
};

export default AssignManager;
