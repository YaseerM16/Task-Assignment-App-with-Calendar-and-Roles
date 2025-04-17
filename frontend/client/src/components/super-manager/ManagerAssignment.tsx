import React, { useState } from "react";
import { UserCheck, ChevronDown, X, Check } from "lucide-react";
import Swal from "sweetalert2";
// import { assignManagerApi } from "@/service/superManagerApi";
import { Employee } from "@/utils/roles.types";

interface ManagerAssignmentProps {
    employee: Employee;
    onClose: () => void;
    onSuccess: () => void;
    managers: Employee[];
}

const ManagerAssignment = ({
    employee,
    onClose,
    onSuccess,
    managers,
}: ManagerAssignmentProps) => {
    const [selectedManager, setSelectedManager] = useState<Employee | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAssignManager = async () => {
        if (!selectedManager) return;

        try {
            setLoading(true);
            // const response = await assignManagerApi({
            //     employeeId: employee._id,
            //     managerId: selectedManager._id,
            // });

            // if (response?.status === 200) {
            //     Swal.fire({
            //         position: "top-end",
            //         icon: "success",
            //         title: "Success!",
            //         text: "Manager assigned successfully",
            //         showConfirmButton: false,
            //         timer: 1500,
            //         toast: true,
            //     });
            //     onSuccess();
            //     onClose();
            // }
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Assign Manager
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                                {employee.username.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium">{employee.username}</p>
                            <p className="text-sm text-gray-500">{employee.role}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Manager
                        </label>
                        <div
                            className="border rounded-lg p-2 flex justify-between items-center cursor-pointer hover:border-gray-400"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className="truncate">
                                {selectedManager?.username || "Select a manager"}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                                {managers.map((manager) => (
                                    <div
                                        key={manager._id}
                                        className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${selectedManager?._id === manager._id ? "bg-blue-50" : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedManager(manager);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 text-xs">
                                                    {manager.username.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium">{manager.username}</p>
                                                <p className="text-xs text-gray-500">{manager.role}</p>
                                            </div>
                                        </div>
                                        {selectedManager?._id === manager._id && (
                                            <Check className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssignManager}
                        disabled={!selectedManager || loading}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${!selectedManager || loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {loading ? "Assigning..." : "Assign Manager"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerAssignment;