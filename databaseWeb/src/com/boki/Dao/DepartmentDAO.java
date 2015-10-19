package com.boki.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.boki.bean.Department;
import com.boki.util.DbManager;

public class DepartmentDAO {

	/**
	 * 插入一條 Department 記錄
	 * 
	 * @param department
	 * @throws Exception
	 */
	public static int insert(Department department) throws Exception {

		String sql = "INSERT INTO tb_department (name) VALUES ( ? ) ";

		return DbManager.executeUpdate(sql, department.getName());
	}

	/**
	 * 儲存 Department
	 * 
	 * @param department
	 * @throws Exception
	 */
	public static int save(Department department) throws Exception {

		String sql = "UPDATE tb_department SET name = ? WHERE id = ? ";

		return DbManager.executeUpdate(sql, department.getName(), department
				.getId());
	}

	/**
	 * 刪除 Department
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static int delete(Integer id) throws Exception {

		String sql = "DELETE FROM tb_department WHERE id = ? ";

		return DbManager.executeUpdate(sql, id);

	}

	/**
	 * 尋找一筆 Department 資料
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public static Department find(Integer id) throws Exception {

		String sql = "SELECT * FROM tb_department WHERE id = ? ";

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DbManager.getConnection();
			//  建立prepareStatement
			preStmt = conn.prepareStatement(sql);
			//  設訂參數
			preStmt.setInt(1, id);
            //  查詢取回結果集
			rs = preStmt.executeQuery();

			if (rs.next()) {
				//  封裝成Department物件
				Department department = new Department();
				department.setId(id);
				department.setName(rs.getString("name"));
				return department;
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
	 * 列出所有的 Department 資料
	 * @return
	 * @throws Exception
	 */
	public static List<Department> listDepartments() throws Exception {

		List<Department> list = new ArrayList<Department>();
        //  查詢所有tb_department並昇冪排序
		String sql = "SELECT * FROM tb_department ORDER BY id DESC ";

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DbManager.getConnection();
			preStmt = conn.prepareStatement(sql);

			rs = preStmt.executeQuery();

			while (rs.next()) {
				//  查詢一筆筆存入Department物件
				Department department = new Department();
				department.setId(rs.getInt("id"));
				department.setName(rs.getString("name"));
                //  Department物件存到list
				list.add(department);
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
