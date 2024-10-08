import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { CheckPasswordService } from './check-password.service';
import { UnauthorizedException } from '@nestjs/common';

describe('CheckPasswordService', () => {
  let service: CheckPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckPasswordService],
    }).compile();

    service = module.get<CheckPasswordService>(CheckPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkPassword', () => {
    it('should return true when passwords match', async () => {
      const password = 'testPassword';
      const hashPassword = await bcrypt.hash(password, 10);

      const result = await service.checkPassword(password, hashPassword);
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException when passwords do not match', async () => {
      const password = 'testPassword';
      const wrongPassword = 'wrongPassword';
      const hashPassword = await bcrypt.hash(password, 10);

      await expect(
        service.checkPassword(wrongPassword, hashPassword),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with specific message when passwords do not match', async () => {
      const password = 'testPassword';
      const wrongPassword = 'wrongPassword';
      const hashPassword = await bcrypt.hash(password, 10);

      await expect(
        service.checkPassword(wrongPassword, hashPassword),
      ).rejects.toThrow('Email or password incorrect');
    });
  });
});
