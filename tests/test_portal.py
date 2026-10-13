import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


class LostFoundPortalTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://127.0.0.1:8000")

    def test_submit_lost_item(self):
        driver = self.driver
        wait = WebDriverWait(driver, 10)

        driver.find_element(By.ID, "itemName").send_keys(
            "Selenium Test Bottle"
        )
        driver.find_element(By.ID, "itemType").send_keys("Lost")
        driver.find_element(By.ID, "itemLocation").send_keys(
            "College Library"
        )
        driver.find_element(By.ID, "itemContact").send_keys(
            "test@example.com"
        )

        driver.find_element(
            By.CSS_SELECTOR, "#itemForm button[type='submit']"
        ).click()

        wait.until(
            lambda d: "successfully" in
            d.find_element(By.ID, "message").text.lower()
        )

        self.assertIn(
            "Selenium Test Bottle",
            driver.find_element(By.ID, "itemsList").text
        )

    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()