import React, { useEffect, useState } from "react";
import { fetchAllEmployeesApi, promoteToManagerApi } from "@/service/superManagerApi";
import Swal from "sweetalert2";
import { Pagination } from "../Pagination";
import { Employee, Manager } from "@/utils/roles.types";
import { Table, TableColumn } from "../Table";
import EmployeeDetailModal from "./EmployeeDetails";
import { Loader } from "../Loader";

const EmployeeManagement = () => {
    const [tab, setTab] = React.useState("employees");
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const employeesPerPage = 6
    const [employees, setEmployees] = useState<Employee[] | []>([])
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


    const handleViewEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
    };

    const fetchEmployees = async (currentPage: number) => {
        try {
            setLoading(true);
            const response = await fetchAllEmployeesApi({ page: currentPage, limit: employeesPerPage });
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

    const handlePromotion = async () => {
        if (!selectedEmployee) return;

        try {
            setLoading(true);
            Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to Promote this Employee into Manager ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, proceed!',
                cancelButtonText: 'No, cancel!',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await promoteToManagerApi(selectedEmployee._id);
                    if (response?.status === 200) {
                        const { data } = response;
                        console.log("Response data by Promote Emp (Backend) :", data.employee);
                        setEmployees(employees?.map(employee => {
                            return employee._id === data.employee ? data.employee : employee
                        }))
                        Swal.fire({
                            icon: 'success',
                            title: "Success",
                            text: "Employee has been Promoted successfully ✅",
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        setSelectedEmployee(null)
                    }
                }
            });
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Failed to assign manager",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
            });
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    const columns: TableColumn<Employee>[] = [
        { header: 'Name', accessor: 'username' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Role', accessor: 'role' },
    ];


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
                    onView={handleViewEmployee}
                />
            )}


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
            {selectedEmployee && (
                <>
                    <EmployeeDetailModal
                        employee={selectedEmployee}
                        onClose={() => setSelectedEmployee(null)}
                        onPromote={() => handlePromotion()}
                    />
                    {/* {loading ? <Spinner /> : ""} */}
                </>
            )}
        </div>
    );
};

export default EmployeeManagement;
