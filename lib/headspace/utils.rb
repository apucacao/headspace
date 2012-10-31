module Headspace
  module Utils
    HASH_ITERATIONS = 10000
    HASH_LENGTH = 160/8 # 20 bytes == 160 bits
    SALT_LENGTH = 160/8

    def self.generate_random_salt
      salt = ''
      File.open('/dev/urandom', 'r') do |random|
        random.read(length)
        salt = random.read(SALT_LENGTH)
      end
      salt
    end

    def self.hash_password(password, salt)
      PBKDF2.new { |p|
        p.password = password
        p.salt = salt
        p.iterations = HASH_ITERATIONS
        p.key_length = HASH_LENGTH
      }.hex_string
    end
  end
end
