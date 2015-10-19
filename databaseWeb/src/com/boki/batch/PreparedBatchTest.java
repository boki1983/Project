package com.boki.batch;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.Driver;

public class PreparedBatchTest {

	public static void main(String[] args) throws SQLException {

		new Driver();

		Connection conn = null;
		PreparedStatement preStmt = null;
		ResultSet rs = null;

		try {
			conn = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
					"root",  "Ie@119653");

			preStmt = conn.prepareStatement("insert into tb_person "
					+ " ( name, english_name, age, "
					+ " sex, birthday, description) "
					+ " values (?, ?, ?, ?, ?, ?) ");

			for (int i = 0; i < 5; i++) {

				int index = 1;

				preStmt.setString(index++, "Name " + i);
				preStmt.setString(index++, "English Name" + i);
				preStmt.setInt(index++, 25);
				preStmt.setString(index++, "man");
				preStmt.setDate(index++, new java.sql.Date(System
						.currentTimeMillis()));
				preStmt.setString(index++, "");

				// 增加同一條帶參數的SQL敘述
				preStmt.addBatch();
			}

			// 批次執行 將每句SQL執行的結果組織成 int[] 陣列
			int[] result = preStmt.executeBatch();

			// 輸出
			System.out.print("影響的行數分別為：");
			for (int i = 0; i < result.length; i++) {
				System.out.print(result[i] + ", ");
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
}
