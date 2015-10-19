package com.boki.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.boki.bean.Employee;
import com.boki.util.DbManager;

public class EmployeeDAO {
	
	/**
	 * 插入一條記錄
	 * 
	 * @param employee
	 * @return
	 * @throws Exception
	 */
	public static int insert(Employee employee) throws Exception {

		String sql = " INSERT INTO tb_employee "
				+ " (department_id, name, sex, employed_date) "
				+ " VALUES (?,?,?,?) ";

		return DbManager.executeUpdate(sql, employee.getDepartment().getId(),
				employee.getName(), employee.getSex(), employee
						.getEmployedDate());
	}

	/**
	 * 儲存一條記錄
	 * 
	 * @param employee
	 * @return
	 * @throws Exception
	 */
	public static int save(Employee employee) throws Exception {

		String sql = " UPDATE tb_employee "
				+ " set department_id = ?, name = ?, sex = ?, employed_date = ? "
				+ " where id = ? ";

		return DbManager.executeUpdate(sql, employee.getDepartment().getId(),
				employee.getName(), employee.getSex(), employee
						.getEmployedDate(), employee.getId());
	}

	/**
	 * 尋找單筆Employee資料
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static Employee find(Integer id) throws Exception {

		String sql = "SELECT * FROM tb_employee WHERE id = ? ";

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DbManager.getConnection();
			preStmt = conn.prepareStatement(sql);
			preStmt.setInt(1, id);

			rs = preStmt.executeQuery();

			if (rs.next()) {
                //  封裝成Employee物件
				Employee employee = new Employee();
				employee.setId(id);
				employee.setName(rs.getString("name"));
				employee.setEmployedDate(rs.getDate("employed_date"));
				employee.setSex(rs.getString("sex"));
                //  設定Employee中Department屬性
				employee.setDepartment(DepartmentDAO.find(rs
						.getInt("department_id")));

				return employee;
			} else {
				return null;
			}

		} finally {
			if (rs != null)
				rs.close();
			if (preStmt != null)
				preStmt.close();
			if (conn != null)
				conn.close();
		}
	}

	/**
	 * 列出所有的員工
	 * @return
	 * @throws Exception
	 */
	public static List<Employee> listAllEmployees() throws Exception {
		List<Employee> list = new ArrayList<Employee>();
        //  SQL查詢語法，依id降冪
		String sql = "SELECT * FROM tb_employee ORDER BY id DESC ";

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DbManager.getConnection();
			preStmt = conn.prepareStatement(sql);

			rs = preStmt.executeQuery();

			while (rs.next()) {
                //  封裝成Employee物件
				Employee employee = new Employee();

				employee.setId(rs.getInt("id"));
				employee.setName(rs.getString("name"));
				employee.setEmployedDate(rs.getDate("employed_date"));
				employee.setSex(rs.getString("sex"));

				employee.setDepartment(DepartmentDAO.find(rs
						.getInt("department_id")));
                //  存到list理
				list.add(employee);
			}

		} finally {
			if (rs != null)
				rs.close();
			if (preStmt != null)
				preStmt.close();
			if (conn != null)
				conn.close();
		}
		return list;
	}

}
