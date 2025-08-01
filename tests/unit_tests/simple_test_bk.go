package unit_tests

import (
	"os"
	"testing"
)

func TestSimple(t *testing.T) {
	t.Log("Starting simple test...")

	// Fixed version - handle both returned values
	if wd, err := os.Getwd(); err != nil {
		t.Log("Error getting working directory:", err)
	} else {
		t.Log("Current working directory:", wd)
	}

	// Check if config.ini file exists
	if _, err := os.Stat("config.ini"); os.IsNotExist(err) {
		t.Log("config.ini does not exist")
	} else {
		t.Log("config.ini exists")
	}

	// Check environment variables
	t.Log("DB_HOST:", os.Getenv("DB_HOST"))
	t.Log("DB_USER:", os.Getenv("DB_USER"))

	t.Log("Simple test completed successfully")
}
