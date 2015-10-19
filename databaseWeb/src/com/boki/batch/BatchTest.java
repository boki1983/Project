package com.boki.batch;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.mysql.jdbc.Driver;

public class BatchTest {

	public static void main(String[] args) throws SQLException {

		new Driver();

		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		try {
			conn = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
					"root",  "Ie@119653");

			stmt = conn.createStatement();

			for (int i = 0; i < 5; i++) {

				// 完整的 SQL 敘述
				String sql = "insert into tb_person "
						+ " ( name, english_name, age, "
						+ " sex, birthday, description) " + " values ('Name "
						+ i + "', 'English Name " + i + "', "
						+ " '17', 'man', current_date(), '') ";

				// 透過addBatch增加一條SQL敘述     批次增加
				stmt.addBatch(sql);
			}

			// 批次執行 將每句SQL執行的結果組織成 int[] 陣列
			int[] result = stmt.executeBatch();

			// 輸出
			System.out.print("影響的行數分別為：");
			for (int i = 0; i < result.length; i++) {
				System.out.print(result[i] + ", ");
			}

		} finally {
			if (rs != null)
				rs.close();

			if (stmt != null)
				stmt.close();

			if (conn != null)
				conn.close();
		}
	}
}
